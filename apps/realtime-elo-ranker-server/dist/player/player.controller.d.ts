import { PlayersService } from './player.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
export declare class PlayersController {
    private readonly playersService;
    constructor(playersService: PlayersService);
    createPlayer(createPlayerDto: CreatePlayerDto): Promise<import("./entities/player.entity").Player | undefined>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updatePlayerDto: UpdatePlayerDto): string;
    remove(id: string): string;
}
