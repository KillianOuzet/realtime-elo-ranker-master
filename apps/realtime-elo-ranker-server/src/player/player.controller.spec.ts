import { Test, TestingModule } from '@nestjs/testing';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { RankingService } from '../ranking/ranking.service';

describe('PlayerController', () => {
  let controller: PlayerController;
  let service: PlayerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayerController],
      providers: [
        {
          provide: PlayerService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            getPlayerById: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: RankingService,
          useValue: {
            // Mockez les méthodes du RankingService si nécessaire
          },
        },
      ],
    }).compile();

    controller = module.get<PlayerController>(PlayerController);
    service = module.get<PlayerService>(PlayerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a player', async () => {
    const createPlayerDto: CreatePlayerDto = {
      id: 'JohnDoe',
      baseRank: 100,
    };
    const result = {
      id: 'JohnDoe',
      rank: 100,
    };
    jest.spyOn(service, 'create').mockResolvedValue(result);

    expect(await controller.createPlayer(createPlayerDto)).toBe(result);
  });

  it('should return an array of players', async () => {
    const result = [{ id: 'JohnDoe', rank: 100 }];
    jest.spyOn(service, 'findAll').mockResolvedValue(result);

    expect(await controller.findAll()).toBe(result);
  });

  it('should return a player by id', async () => {
    const result = { id: 'JohnDoe', rank: 100 };
    jest.spyOn(service, 'getPlayerById').mockResolvedValue(result);

    expect(await controller.findOne('JohnDoe')).toBe(result);
  });

  // it('should update a player', async () => {
  //   const result = { id: 'JohnDoe', rank: 200 };
  //   jest.spyOn(service, 'updatePlayerRank').mockResolvedValue(result);

  //   expect(await controller.updatePlayerRank('JohnDoe', 200)).toBe(result);
  // });
});
