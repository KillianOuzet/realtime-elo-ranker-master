import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity';
import { RankingService } from '../ranking/ranking.service';
export declare class PlayerService {
    private playerRepository;
    private rankingService;
    constructor(playerRepository: Repository<Player>, rankingService: RankingService);
    onModuleInit(): Promise<void>;
    create(createPlayerDto: CreatePlayerDto): Promise<Player>;
    getPlayerById(id: string): Promise<Player | null>;
    updatePlayerRank(id: string, newRank: number): Promise<Player>;
    getAverageRank(): Promise<number>;
    findAll(): Promise<Player[]>;
    findOne(id: number): string;
    update(id: number, updatePlayerDto: UpdatePlayerDto): string;
    remove(id: number): string;
}
