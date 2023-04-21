import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './entities/game.entity';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
  ) {}
  create(createGameDto: CreateGameDto) {
    return this.gameRepository.save(createGameDto);
  }

  findAll() {
    return this.gameRepository.find();
  }

  findOne(id: number) {
    return this.gameRepository.findOne({
      where: { id },
      relations: ['players'],
    });
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return this.gameRepository.update(id, updateGameDto);
  }

  remove(id: number) {
    return this.gameRepository.delete(id);
  }

  async findByUuid(uuid: string) {
    return this.gameRepository.findOne({ where: { uuid } });
  }
}
