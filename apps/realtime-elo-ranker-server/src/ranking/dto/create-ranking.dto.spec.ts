import { CreateRankingDto } from './create-ranking.dto';

describe('CreateRankingDto', () => {
  it('should create an instance of CreateRankingDto', () => {
    const dto = new CreateRankingDto();
    dto.id = 'JohnDoe';
    dto.rank = 1200;

    expect(dto).toBeInstanceOf(CreateRankingDto);
    expect(dto.id).toBe('JohnDoe');
    expect(dto.rank).toBe(1200);
  });

  it('should validate the properties of CreateRankingDto', () => {
    const dto = new CreateRankingDto();
    dto.id = 'JohnDoe';
    dto.rank = 1200;

    expect(dto.id).toBeDefined();
    expect(dto.rank).toBeDefined();
  });
});
