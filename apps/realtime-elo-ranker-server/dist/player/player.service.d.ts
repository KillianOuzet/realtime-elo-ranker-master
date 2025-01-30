import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class PlayerService {
    private playerRepository;
    private eventEmitter;
    constructor(playerRepository: Repository<Player>, eventEmitter: EventEmitter2);
    create(createPlayerDto: CreatePlayerDto): Promise<Player>;
    getPlayerById(id: string): Promise<Player | null>;
    updatePlayerRank(id: string, newRank: number): Promise<Player>;
    getAverageRank(): Promise<number>;
    findAll(): Promise<Player[]>;
    findOne(id: number): string;
    update(id: number, updatePlayerDto: UpdatePlayerDto): string;
    remove(id: number): string;
}
