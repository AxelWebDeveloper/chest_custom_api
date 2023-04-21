import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Socket } from 'socket.io-client';
import { GamesService } from '../module/games/games.service';
import { UsersService } from '../module/users/users.service';
import { User } from '../module/users/entities/user.entity';
import { CreateGameGatewayDto } from '../module/games/dto/create-game-gateway.dto';
import { Game } from '../module/games/entities/game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

interface joinGameDto {
  game: Game;
  user: User;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class GamesGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    private readonly gameService: GamesService,
    private readonly userService: UsersService,
  ) {}
  @SubscribeMessage('createGame')
  async createGame(client: Socket, @MessageBody() data: CreateGameGatewayDto) {
    try {
      const player: User = await this.userService.findOne(data.user.id);
      const newData: Game = new Game();
      newData.name = data.name;
      newData.isOpen = true;
      newData.uuid = data.uuid;
      newData.players = [player];
      const game: Game = await this.gameService.create(newData);
      this.server.emit('gameCreated', game);
    } catch (err) {
      console.error(err);
      this.server.emit('createGameError', { message: err.message });
    }
  }

  @SubscribeMessage('joinGame')
  async joinGame(client: Socket, joinData: joinGameDto) {
    const game: Game = await this.gameService.findOne(joinData.game.id);
    if (!game) {
      return this.server.emit('joinGameError', { message: 'Game not found' });
    }

    await this.userRepository
      .createQueryBuilder()
      .relation(Game, 'players')
      .of(game)
      .add(joinData.user);

    await this.gameRepository
      .createQueryBuilder()
      .update({ isOpen: false })
      .where('id = :id', { id: joinData.game.id })
      .execute();

    const updatedGame = await this.gameService.findOne(joinData.game.id);
    this.server.emit('gameUpdated', updatedGame);
    this.server.emit('playerJoined', { game: game, user: joinData.user });
  }

  @SubscribeMessage('move')
  handleMove(socket: Socket, payload: { from: string; to: string }) {
    this.server.emit('moveDone', payload);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: { message: string; user: User }): void {
    this.server.emit('message', message);
  }
}
