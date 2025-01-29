import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity';
export declare class PlayerService {
    private playerRepository;
    constructor(playerRepository: Repository<Player>);
    create(createPlayerDto: CreatePlayerDto): Promise<Player>;
    getPlayerById(id: string): Promise<Player | null>;
    updatePlayerRank(id: string, newRank: number): Promise<Player>;
    getAverageRank(): Promise<number>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePlayerDto: UpdatePlayerDto): string;
    remove(id: number): string;
}
