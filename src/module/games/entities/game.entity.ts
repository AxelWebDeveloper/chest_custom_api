import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/module/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class Game {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @ApiProperty({ default: '8765432' })
  @Column({ name: 'name', nullable: true })
  public name: string;

  @ApiProperty({ default: 'jean' })
  @UpdateDateColumn({ name: 'updatedAt', nullable: true })
  public updatedAt: Date;

  @ApiProperty({ default: 'jean' })
  @CreateDateColumn({ name: 'createdAt', nullable: true })
  public createdAt: Date;

  @ApiProperty({ default: 1, nullable: true })
  @Column({ name: 'userId', nullable: true })
  public userId: number;

  @ApiProperty({ default: 1, nullable: true })
  @Column({ name: 'isOpen', nullable: true })
  public isOpen: number;

  @ManyToOne(() => User, (user) => user.games)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user?: User;
}
