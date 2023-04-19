import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Socket } from 'socket.io-client';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketEvents {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('createGame')
  createGame(client: Socket, data: string) {}
}
