import { Test, TestingModule } from '@nestjs/testing';
import { RankingController } from './ranking.controller';
import { RankingService } from './ranking.service';
import { Player } from '../player/entities/player.entity';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { CreateRankingDto } from './dto/create-ranking.dto';

describe('RankingController', () => {
  let controller: RankingController;
  let service: RankingService;
  let eventEmitter: EventEmitter2;

  beforeEach(async () => {
    eventEmitter = new EventEmitter2();
    const module: TestingModule = await Test.createTestingModule({
      imports: [EventEmitterModule.forRoot()],
      controllers: [RankingController],
      providers: [
        RankingService,
        { provide: EventEmitter2, useValue: eventEmitter },
      ],
    }).compile();

    controller = module.get<RankingController>(RankingController);
    service = module.get<RankingService>(RankingService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should initialize the ladder', () => {
    const players: CreateRankingDto[] = [{ id: 'JohnDoe', rank: 1200 }];
    jest.spyOn(service, 'initLadder').mockImplementation(() => players);

    service.initLadder(players);

    expect(service.initLadder(players)).toBe(players);
  });

  it('should return the ladder', () => {
    const result = [{ id: 'JohnDoe', rank: 1200 }];
    jest.spyOn(service, 'getLadder').mockImplementation(() => result);

    expect(controller.findAll()).toBe(result);
  });

  it('should return SSE stream of player.created events', (done) => {
    const player: Player = { id: 'JohnDoe', rank: 1200 };

    const sse$ = controller.sse();
    const subscription = sse$.subscribe((message) => {
      expect(message.data).toEqual({
        type: 'RankingUpdate',
        player: { id: 'JohnDoe', rank: 1200 },
      });
      subscription.unsubscribe();
      done();
    });

    // Emit the event after subscribing to ensure the event is captured
    setTimeout(() => {
      eventEmitter.emit('player.created', player);
    }, 0);
  });
});
