import { RankingService } from './ranking.service';
import { Observable } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class RankingController {
    private readonly rankingService;
    private readonly eventEmitter;
    constructor(rankingService: RankingService, eventEmitter: EventEmitter2);
    sse(): Observable<MessageEvent>;
    findAll(): import("./dto/create-ranking.dto").CreateRankingDto[];
}
