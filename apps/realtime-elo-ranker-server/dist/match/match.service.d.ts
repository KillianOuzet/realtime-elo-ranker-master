import { PlayerService } from './../player/player.service';
import { PublishMatchDto } from './dto/publish-match.dto';
export declare class MatchService {
    private playerService;
    constructor(playerService: PlayerService);
    publishResults(publishMatchDto: PublishMatchDto): Promise<{
        winner: {
            id: string;
            rank: number;
        };
        loser: {
            id: string;
            rank: number;
        };
        draw: boolean | undefined;
    }>;
    private calculateElo;
}
