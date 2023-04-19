import { Module, OnModuleInit } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Server } from '@nestjs/platform-socket.io';
import { GameService } from './game.service';

@Module({
  providers: [SocketService, GameService],
})
export class SocketModule implements OnModuleInit {
  constructor(
    private readonly socketService: SocketService,
    private readonly gameService: GameService,
  ) {}

  onModuleInit() {
    this.socketService.server.on('connection', (socket: Socket) => {
      console.log(`Client connecté : ${socket.id}`);

      socket.on('createGame', (data, callback) => {
        const gameId = this.gameService.createGame();
        callback(gameId);
      });

      socket.on('joinGame', (data, callback) => {
        const gameId = data.gameId;
        this.gameService.joinGame(gameId, socket);
        callback(true);
      });

      socket.on('move', (data) => {
        console.log(`Mouvement reçu de ${socket.id} :`, data);
        socket.broadcast.emit('move', data);
      });

      socket.on('disconnect', () => {
        console.log(`Client déconnecté : ${socket.id}`);
      });
    });
  }
}
