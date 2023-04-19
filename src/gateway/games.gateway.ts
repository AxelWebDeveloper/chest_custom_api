import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Socket } from 'socket.io-client';
import { GamesService } from '../games.service';
import { CreateGameDto } from '../dto/create-game.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class GamesGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly gameService: GamesService) {}

  @SubscribeMessage('createGame')
  async createGame(client: Socket, @MessageBody() data: CreateGameDto) {
    try {
      const game = await this.gameService.create(data);
      this.server.emit('createGame', game);
    } catch (err) {
      client.emit('createGameError', { message: err.message });
    }
  }
}
