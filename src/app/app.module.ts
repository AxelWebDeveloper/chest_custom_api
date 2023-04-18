import { User } from './../module/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';

import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { RolesGuard } from 'src/guards/roles.guard';
import { InjectUser } from 'src/middlewares/injectUser';
import { AuthModule } from 'src/module/auth/auth.module';
import { JwtStrategy } from 'src/module/auth/jwt.strategy';
import { UsersModule } from 'src/module/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.TYPEORM_HOST,
        port: parseInt(process.env.TYPEORM_PORT) || 3306,
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        database: process.env.TYPEORM_DATABASE,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: false,
      }),
    }),
    UsersModule,
    AuthModule,
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
