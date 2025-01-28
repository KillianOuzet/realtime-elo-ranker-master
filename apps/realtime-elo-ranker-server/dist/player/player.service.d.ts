import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity';
export declare class PlayersService {
    private playersRepository;
    constructor(playersRepository: Repository<Player>);
    create(createPlayerDto: CreatePlayerDto): Promise<Player>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePlayerDto: UpdatePlayerDto): string;
    remove(id: number): string;
}
