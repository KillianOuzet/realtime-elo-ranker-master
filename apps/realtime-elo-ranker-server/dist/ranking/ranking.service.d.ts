import { PlayerService } from './../player/player.service';
export declare class RankingService {
    private playerService;
    constructor(playerService: PlayerService);
    findAll(): Promise<import("../player/entities/player.entity").Player[]>;
}
