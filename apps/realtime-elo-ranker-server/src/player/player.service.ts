import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private playersRepository: Repository<Player>,
  ) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    if (!createPlayerDto.id) {
      throw new BadRequestException('Invalid player ID');
    }
    const existingPlayer = await this.playersRepository.findOne({
      where: { id: createPlayerDto.id },
    });
    if (existingPlayer) {
      throw new ConflictException('Player already exists');
    }
    const player = this.playersRepository.create({
      id: createPlayerDto.id,
      rank: createPlayerDto.baseRank ?? 1000,
    });
    return await this.playersRepository.save(player);
  }

  findAll() {
    return `This action returns all players`;
  }

  findOne(id: number) {
    return `This action returns a #${id} player`;
  }

  update(id: number, updatePlayerDto: UpdatePlayerDto) {
    return `This action updates a #${id} player`;
  }

  remove(id: number) {
    return `This action removes a #${id} player`;
  }
}
