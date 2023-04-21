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
    private readonly gameService: GamesService,
    private readonly userService: UsersService,
  ) {}
  @SubscribeMessage('createGame')
  async createGame(client: Socket, @MessageBody() data: CreateGameGatewayDto) {
    try {
      const player = await this.userService.findOne(data.user.id);
      const newData = new Game();
      newData.name = data.name;
      newData.isOpen = true;
      newData.uuid = data.uuid;
      newData.players = [player];
      console.log(newData);
      const game = await this.gameService.create(newData);
      this.server.emit('gameCreated', game);
    } catch (err) {
      console.error(err);
      this.server.emit('createGameError', { message: err.message });
    }
  }

  @SubscribeMessage('joinGame')
  async joinGame(client: Socket, joinData: joinGameDto) {
    const game = await this.gameService.findOne(joinData.game.id);
    if (!game) {
      return this.server.emit('joinGameError', { message: 'Game not found' });
    }
    console.log('game', game.players);
    game.players = [joinData.user];
    game.isOpen = false;
    delete game.id;
    const updatedGame = await this.gameService.update(joinData.game.id, game);
    this.server.emit('gameUpdated', updatedGame);
    this.server.emit('playerJoined', { game: game, user: joinData.user });
  }
}
