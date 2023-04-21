import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/module/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity({ name: 'game' })
export class Game {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'uuid' })
  public uuid: string;

  @ApiProperty({ default: '8765432' })
  @Column({ name: 'name', nullable: true })
  public name: string;

  @ApiProperty({ default: 'jean' })
  @UpdateDateColumn({ name: 'updatedAt', nullable: true })
  public updatedAt: Date;

  @ApiProperty({ default: 'jean' })
  @CreateDateColumn({ name: 'createdAt', nullable: true })
  public createdAt: Date;

  @ManyToMany(() => User, (user) => user.games)
  @JoinTable()
  public players: User[];

  @ApiProperty({ default: 1, nullable: true })
  @Column()
  public isOpen: boolean;
}
