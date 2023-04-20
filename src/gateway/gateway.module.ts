import { Module } from '@nestjs/common';
import { GamesGateway } from './games.gateway';
import { GamesModule } from '../module/games/games.module';

@Module({
  imports: [GamesModule],
  providers: [GamesGateway],
})
export class GatewayModule {}
