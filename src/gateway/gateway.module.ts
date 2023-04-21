import { Module } from '@nestjs/common';
import { GamesGateway } from './games.gateway';
import { GamesModule } from '../module/games/games.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../module/users/entities/user.entity';
import { UsersModule } from '../module/users/users.module';
import { Game } from '../module/games/entities/game.entity';

@Module({
  imports: [
    GamesModule,
    UsersModule,
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Game]),
  ],
  providers: [GamesGateway],
})
export class GatewayModule {}
