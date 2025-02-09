import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity';
import { RankingService } from '../ranking/ranking.service'; // Utilisez un chemin relatif

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
    private rankingService: RankingService,
  ) {}

  async onModuleInit() {
    try {
      const players = await this.findAll();
      this.rankingService.initLadder(players);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

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
    this.rankingService.addPlayer(player);
    return await this.playerRepository.save(player);
  }

  async getPlayerById(id: string): Promise<Player | null> {
    const player = await this.playerRepository.findOne({ where: { id: id } });
    if (!player) {
      throw new BadRequestException('Player not found');
    }
    return player;
  }

  async updatePlayerRank(id: string, newRank: number): Promise<Player> {
    const player = await this.getPlayerById(id);
    if (!player) {
      throw new BadRequestException('Player not found');
    }
    player.rank = newRank;
    this.rankingService.UpdatePlayerRank(player);
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
      return [];
    }
    return players;
  }
}
