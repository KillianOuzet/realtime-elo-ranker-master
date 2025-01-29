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
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    if (!createPlayerDto.id) {
      throw new BadRequestException('Invalid player ID');
    }
    const existingPlayer = await this.playerRepository.findOne({
      where: { id: createPlayerDto.id },
    });
    if (existingPlayer) {
      throw new ConflictException('Player already exists');
    }
    const baseRank = createPlayerDto.baseRank ?? (await this.getAverageRank());
    const player = this.playerRepository.create({
      id: createPlayerDto.id,
      rank: baseRank,
    });
    return await this.playerRepository.save(player);
  }

  getPlayerById(id: string): Promise<Player | null> {
    return this.playerRepository.findOne({ where: { id: id } });
  }

  async updatePlayerRank(id: string, newRank: number): Promise<Player> {
    const player = await this.getPlayerById(id);
    if (!player) {
      throw new BadRequestException('Player not found');
    }
    player.rank = newRank;
    return this.playerRepository.save(player);
  }

  async getAverageRank(): Promise<number> {
    const players = await this.playerRepository.find();
    if (players.length === 0) {
      return 1000;
    }
    const totalRank = players.reduce((sum, player) => sum + player.rank, 0);
    return totalRank / players.length;
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
