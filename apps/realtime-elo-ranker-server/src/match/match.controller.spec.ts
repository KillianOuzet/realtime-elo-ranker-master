import { Test, TestingModule } from '@nestjs/testing';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { PublishMatchDto } from './dto/publish-match.dto';

describe('MatchController', () => {
  let controller: MatchController;
  let service: MatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchController],
      providers: [
        {
          provide: MatchService,
          useValue: {
            publishResults: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MatchController>(MatchController);
    service = module.get<MatchService>(MatchService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should publish a match', async () => {
    const publishMatchDto: PublishMatchDto = {
      winner: 'JohnDoe',
      loser: 'JaneDoe',
      draw: false,
    };
    const result = {
      winner: { id: 'JohnDoe', rank: 1200 },
      loser: { id: 'JaneDoe', rank: 1100 },
      draw: false,
    };
    jest.spyOn(service, 'publishResults').mockResolvedValue(result);

    expect(await controller.publish(publishMatchDto)).toBe(result);
  });
});
