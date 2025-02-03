import { PlayerService } from './../player/player.service';
export declare class RankingService {
    private playerService;
    constructor(playerService: PlayerService);
    findAll(callback: (error: Error | null, result?: any) => void): void;
}
