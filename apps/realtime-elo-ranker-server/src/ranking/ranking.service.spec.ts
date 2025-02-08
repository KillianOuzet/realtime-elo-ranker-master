import { Test, TestingModule } from '@nestjs/testing';
import { RankingService } from './ranking.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateRankingDto } from './dto/create-ranking.dto';
import { UpdateRankingDto } from './dto/update-ranking.dto';

describe('RankingService', () => {
  let service: RankingService;
  let eventEmitter: EventEmitter2;

  beforeEach(async () => {
    eventEmitter = new EventEmitter2();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RankingService,
        { provide: EventEmitter2, useValue: eventEmitter },
      ],
    }).compile();

    service = module.get<RankingService>(RankingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should initialize the ladder', () => {
    const players: CreateRankingDto[] = [
      { id: '1', rank: 100 },
      { id: '2', rank: 200 },
    ];
    const ladder = service.initLadder(players);
    expect(ladder).toEqual([
      { id: '2', rank: 200 },
      { id: '1', rank: 100 },
    ]);
  });

  it('should return the ladder', () => {
    const players: CreateRankingDto[] = [
      { id: '1', rank: 100 },
      { id: '2', rank: 200 },
    ];
    service.initLadder(players);
    const ladder = service.getLadder();
    expect(ladder).toEqual([
      { id: '2', rank: 200 },
      { id: '1', rank: 100 },
    ]);
  });

  it('should add a player to the ladder', () => {
    const player: CreateRankingDto = { id: '3', rank: 150 };
    service.addPlayer(player);
    const ladder = service.getLadder();
    expect(ladder).toContainEqual(player);
  });

  it('should update a player rank in the ladder', () => {
    const players: CreateRankingDto[] = [
      { id: '1', rank: 100 },
      { id: '2', rank: 200 },
    ];
    service.initLadder(players);
    const updatePlayer: UpdateRankingDto = { id: '1', rank: 250 };
    service.UpdatePlayerRank(updatePlayer);
    const ladder = service.getLadder();
    expect(ladder).toEqual([
      { id: '1', rank: 250 },
      { id: '2', rank: 200 },
    ]);
  });
});
