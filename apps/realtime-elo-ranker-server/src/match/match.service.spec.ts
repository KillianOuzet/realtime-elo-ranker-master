import { Test, TestingModule } from '@nestjs/testing';
import { MatchService } from './match.service';
import { PlayerService } from '../player/player.service';
import { PublishMatchDto } from './dto/publish-match.dto';
import { UnprocessableEntityException } from '@nestjs/common';

describe('MatchService', () => {
  let service: MatchService;
  let playerService: PlayerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MatchService,
        {
          provide: PlayerService,
          useValue: {
            getPlayerById: jest.fn(),
            updatePlayerRank: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MatchService>(MatchService);
    playerService = module.get<PlayerService>(PlayerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should publish match results', async () => {
    const publishMatchDto: PublishMatchDto = {
      winner: 'JohnDoe',
      loser: 'JaneDoe',
      draw: false,
    };

    const winner = { id: 'JohnDoe', rank: 1200 };
    const loser = { id: 'JaneDoe', rank: 1100 };

    jest.spyOn(playerService, 'getPlayerById').mockResolvedValueOnce(winner);
    jest.spyOn(playerService, 'getPlayerById').mockResolvedValueOnce(loser);
    jest.spyOn(playerService, 'updatePlayerRank').mockResolvedValueOnce({
      ...winner,
      rank: 1216,
    });
    jest.spyOn(playerService, 'updatePlayerRank').mockResolvedValueOnce({
      ...loser,
      rank: 1084,
    });

    const result = await service.publishResults(publishMatchDto);

    expect(result).toEqual({
      winner: { id: 'JohnDoe', rank: 1216 },
      loser: { id: 'JaneDoe', rank: 1084 },
      draw: false,
    });
  });

  it('should throw an exception if a player does not exist', async () => {
    const publishMatchDto: PublishMatchDto = {
      winner: 'JohnDoe',
      loser: 'JaneDoe',
      draw: false,
    };

    jest.spyOn(playerService, 'getPlayerById').mockResolvedValueOnce(null);

    await expect(service.publishResults(publishMatchDto)).rejects.toThrow(
      UnprocessableEntityException,
    );
  });

  it('should calculate Elo ratings correctly for a win', () => {
    const winnerRank = 1200;
    const loserRank = 1100;
    const { newWinnerRank, newLoserRank } = service['calculateElo'](
      winnerRank,
      loserRank,
      false,
    );

    expect(newWinnerRank).toBe(1212);
    expect(newLoserRank).toBe(1088);
  });

  it('should calculate Elo ratings correctly for a draw', () => {
    const winnerRank = 1200;
    const loserRank = 1100;
    const { newWinnerRank, newLoserRank } = service['calculateElo'](
      winnerRank,
      loserRank,
      true,
    );

    expect(newWinnerRank).toBe(1196);
    expect(newLoserRank).toBe(1104);
  });
});
