import { MatchService } from './match.service';
import { PublishMatchDto } from './dto/publish-match.dto';
export declare class MatchController {
    private readonly matchService;
    constructor(matchService: MatchService);
    publish(publishMatchDto: PublishMatchDto): Promise<{
        winner: {
            id: string;
            rank: number;
        };
        loser: {
            id: string;
            rank: number;
        };
        draw: boolean | undefined;
    }> | undefined;
}
