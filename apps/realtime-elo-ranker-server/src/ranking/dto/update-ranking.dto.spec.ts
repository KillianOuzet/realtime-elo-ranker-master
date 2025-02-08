import { UpdateRankingDto } from './update-ranking.dto';

describe('UpdateRankingDto', () => {
  it('should create an instance of UpdateRankingDto', () => {
    const dto = new UpdateRankingDto();
    dto.id = 'JohnDoe';
    dto.rank = 1300;

    expect(dto).toBeInstanceOf(UpdateRankingDto);
    expect(dto.id).toBe('JohnDoe');
    expect(dto.rank).toBe(1300);
  });

  it('should validate the properties of UpdateRankingDto', () => {
    const dto = new UpdateRankingDto();
    dto.id = 'JohnDoe';
    dto.rank = 1300;

    expect(dto.id).toBeDefined();
    expect(dto.rank).toBeDefined();
  });
});
