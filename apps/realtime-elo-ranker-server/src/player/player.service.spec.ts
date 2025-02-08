import { Test, TestingModule } from '@nestjs/testing';
import { PlayerService } from './player.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { Repository } from 'typeorm';
import { RankingService } from '../ranking/ranking.service';
import {
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

describe('PlayerService', () => {
  let service: PlayerService;
  let repository: Repository<Player>;
  let rankingService: RankingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayerService,
        {
          provide: getRepositoryToken(Player),
          useClass: Repository,
        },
        {
          provide: RankingService,
          useValue: {
            addPlayer: jest.fn(),
            initLadder: jest.fn(),
            UpdatePlayerRank: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PlayerService>(PlayerService);
    repository = module.get<Repository<Player>>(getRepositoryToken(Player));
    rankingService = module.get<RankingService>(RankingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should initialize ladder on module init', async () => {
    const players = [{ id: 'JohnDoe', rank: 100 }];
    jest.spyOn(service, 'findAll').mockResolvedValue(players as any);
    jest.spyOn(rankingService, 'initLadder');

    await service.onModuleInit();

    expect(rankingService.initLadder).toHaveBeenCalledWith(players);
  });

  it('should create a player', async () => {
    const createPlayerDto = { id: 'JohnDoe', baseRank: 100 };
    const player = { id: 'JohnDoe', rank: 100 };
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);
    jest.spyOn(repository, 'create').mockReturnValue(player as any);
    jest.spyOn(repository, 'save').mockResolvedValue(player as any);

    expect(await service.create(createPlayerDto)).toBe(player);
  });

  it('should throw conflict exception if player already exists', async () => {
    const createPlayerDto = { id: 'JohnDoe', baseRank: 100 };
    const player = { id: 'JohnDoe', rank: 100 };
    jest.spyOn(repository, 'findOne').mockResolvedValue(player as any);

    await expect(service.create(createPlayerDto)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should return all players', async () => {
    const players = [{ id: 'JohnDoe', rank: 100 }];
    jest.spyOn(repository, 'find').mockResolvedValue(players as any);

    expect(await service.findAll()).toBe(players);
  });

  it('should throw not found exception if no players exist', async () => {
    jest.spyOn(repository, 'find').mockResolvedValue([]);

    await expect(service.findAll()).rejects.toThrow(NotFoundException);
  });

  it('should return a player by id', async () => {
    const player = { id: 'JohnDoe', rank: 100 };
    jest.spyOn(repository, 'findOne').mockResolvedValue(player as any);

    expect(await service.getPlayerById('JohnDoe')).toBe(player);
  });

  it('should throw bad request exception if player id is invalid', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);

    await expect(service.getPlayerById('')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should update player rank', async () => {
    const player = { id: 'JohnDoe', rank: 100 };
    jest.spyOn(repository, 'findOne').mockResolvedValue(player as any);
    jest
      .spyOn(repository, 'save')
      .mockResolvedValue({ ...player, rank: 200 } as any);

    expect(await service.updatePlayerRank('JohnDoe', 200)).toEqual({
      ...player,
      rank: 200,
    });
  });

  it('should throw bad request exception if player not found for update', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);

    await expect(service.updatePlayerRank('', 200)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should calculate average rank', async () => {
    const players = [
      { id: 'JohnDoe', rank: 100 },
      { id: 'JaneDoe', rank: 200 },
    ];
    jest.spyOn(repository, 'find').mockResolvedValue(players as any);

    expect(await service.getAverageRank()).toBe(150);
  });

  it('should return default rank if no players exist for average rank', async () => {
    jest.spyOn(repository, 'find').mockResolvedValue([]);

    expect(await service.getAverageRank()).toBe(100);
  });
});
