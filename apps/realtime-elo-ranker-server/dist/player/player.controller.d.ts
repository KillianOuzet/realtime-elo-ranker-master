import { PlayerService } from './player.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
export declare class PlayerController {
    private readonly playerService;
    constructor(playerService: PlayerService);
    createPlayer(createPlayerDto: CreatePlayerDto): Promise<import("./entities/player.entity").Player | undefined>;
    findAll(): Promise<import("./entities/player.entity").Player[]>;
    findOne(id: string): string;
    update(id: string, updatePlayerDto: UpdatePlayerDto): string;
    remove(id: string): string;
}
