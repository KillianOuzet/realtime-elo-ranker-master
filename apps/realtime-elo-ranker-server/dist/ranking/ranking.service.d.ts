import { CreateRankingDto } from './dto/create-ranking.dto';
import { UpdateRankingDto } from './dto/update-ranking.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class RankingService {
    private eventEmitter;
    constructor(eventEmitter: EventEmitter2);
    private ladder;
    initLadder(players: CreateRankingDto[]): CreateRankingDto[];
    getLadder(): CreateRankingDto[];
    addPlayer(createRankingDto: CreateRankingDto): void;
    UpdatePlayerRank(updateRankingDto: UpdateRankingDto): void;
}
