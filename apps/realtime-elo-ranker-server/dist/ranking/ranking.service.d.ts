import { CreateRankingDto } from './dto/create-ranking.dto';
import { UpdateRankingDto } from './dto/update-ranking.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class RankingService {
    private eventEmitter;
    constructor(eventEmitter: EventEmitter2);
    private ladder;
    initLadder(players: {
        id: string;
        rank: number;
    }[]): void;
    getLadder(): {
        id: string;
        rank: number;
    }[];
    addPlayer(createRankingDto: CreateRankingDto): void;
    UpdatePlayerRank(updateRankingDto: UpdateRankingDto): void;
}
