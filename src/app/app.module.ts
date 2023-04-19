import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { RolesGuard } from 'src/guards/roles.guard';
import { InjectUser } from 'src/middlewares/injectUser';
import { AuthModule } from 'src/module/auth/auth.module';
import { JwtStrategy } from 'src/module/auth/jwt.strategy';
import { UsersModule } from 'src/module/users/users.module';
import configuration from 'src/config/configuration';
import { SocketModule } from '../socket/socket.module';
import { GamesModule } from 'src/module/games/games.module';


@Module({
  imports: [
    // ConfigModule.forRoot({
    //   load: [configuration],
    //   envFilePath: ['.env'],
    // }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 1615,
      username: 'test_user_chest',
      password: 'chest',
      database: 'local_chest_db',
      entities: [__dirname + '/../**/*.entity.js'],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    SocketModule,
    GamesModule,

  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy, RolesGuard],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(InjectUser)
      .exclude({ path: 'auth', method: RequestMethod.ALL }, 'auth/(.*)')
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
