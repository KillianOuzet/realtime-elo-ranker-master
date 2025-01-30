import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    if (!createPlayerDto.id) {
      throw new BadRequestException("L'identifiant du joueur n'est pas valide");
    }
    const existingPlayer = await this.playerRepository.findOne({
      where: { id: createPlayerDto.id },
    });
    if (existingPlayer) {
      throw new ConflictException('Le joueur existe déjà');
    }
    const baseRank = createPlayerDto.baseRank ?? (await this.getAverageRank());
    const player = this.playerRepository.create({
      id: createPlayerDto.id,
      rank: baseRank,
    });
    this.eventEmitter.emit('player.created', player);
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
    this.eventEmitter.emit('player.updated', player);
    return this.playerRepository.save(player);
  }

  async getAverageRank(): Promise<number> {
    const players = await this.playerRepository.find();
    if (players.length === 0) {
      return 100;
    }
    const totalRank = players.reduce((sum, player) => sum + player.rank, 0);
    return Math.round(totalRank / players.length);
  }

  async findAll() {
    const players = await this.playerRepository.find();
    if (players.length === 0) {
      throw new NotFoundException('No players exist');
    }
    return players;
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
