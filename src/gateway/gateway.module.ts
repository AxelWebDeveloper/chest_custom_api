import { Module } from '@nestjs/common';
import { SocketEvents } from './socketEvents';
import { GamesService } from '../module/games/games.service';

@Module({
  imports: [GamesService],
  providers: [SocketEvents],
})
export class SocketModule {}
