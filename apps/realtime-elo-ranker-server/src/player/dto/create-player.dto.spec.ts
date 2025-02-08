import { CreatePlayerDto } from './create-player.dto';

describe('CreatePlayerDto', () => {
  it('should create an instance of CreatePlayerDto', () => {
    const dto = new CreatePlayerDto();
    dto.id = 'JohnDoe';
    dto.baseRank = 1200;

    expect(dto).toBeInstanceOf(CreatePlayerDto);
    expect(dto.id).toBe('JohnDoe');
    expect(dto.baseRank).toBe(1200);
  });

  it('should validate the properties of CreatePlayerDto', () => {
    const dto = new CreatePlayerDto();
    dto.id = 'JohnDoe';
    dto.baseRank = 1200;

    expect(dto.id).toBeDefined();
    expect(dto.baseRank).toBeDefined();
  });
});
