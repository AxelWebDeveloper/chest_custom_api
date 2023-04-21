import { Module } from '@nestjs/common';
import { GamesGateway } from './games.gateway';
import { GamesModule } from '../module/games/games.module';
import { UsersModule } from '../module/users/users.module';

@Module({
  imports: [GamesModule, UsersModule],
  providers: [GamesGateway],
})
export class GatewayModule {}
