import { ApiProperty } from '@nestjs/swagger';
import { Game } from 'src/module/games/entities/game.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as rolesEnum from '../../enum/roles.enum';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @ApiProperty({ default: '8765432' })
  @Column({ name: 'uuid', nullable: true })
  public uuid: string;

  @ApiProperty({ default: 'email@email.fr' })
  @Column({ name: 'email', nullable: true })
  public email: string;

  @ApiProperty({ default: 'jean' })
  @Column({ name: 'firstName', nullable: true })
  public firstName: string;

  @ApiProperty({ default: 'jean' })
  @Column({ name: 'lastName', nullable: true })
  public lastName: string;

  @ApiProperty({ default: 'Admin', nullable: true })
  @Column({ type: 'enum', enum: rolesEnum.Role })
  public role?: rolesEnum.Role;

  @ApiProperty({ default: 'jean' })
  @Column({ name: 'password', nullable: true })
  public password: string;

  @ApiProperty({ default: 'jean' })
  @UpdateDateColumn({ name: 'updatedAt', nullable: true })
  public updatedAt: Date;

  @ManyToMany(() => Game, (game) => game.players)
  public games: Game[];

  @ApiProperty({ default: 'jean' })
  @CreateDateColumn({ name: 'createdAt', nullable: true })
  public createdAt: Date;
}
