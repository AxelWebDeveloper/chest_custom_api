import { PartialType } from '@nestjs/swagger';
import { Game } from '../entities/game.entity';

export class CreateGameDto extends PartialType(Game) {}
