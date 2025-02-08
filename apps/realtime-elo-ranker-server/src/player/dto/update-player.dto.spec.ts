import { UpdatePlayerDto } from './update-player.dto';

describe('UpdatePlayerDto', () => {
  it('should create an instance of UpdatePlayerDto', () => {
    const dto = new UpdatePlayerDto();
    dto.id = 'JohnDoe';
    dto.rank = 1300;

    expect(dto).toBeInstanceOf(UpdatePlayerDto);
    expect(dto.id).toBe('JohnDoe');
    expect(dto.rank).toBe(1300);
  });

  it('should validate the properties of UpdatePlayerDto', () => {
    const dto = new UpdatePlayerDto();
    dto.id = 'JohnDoe';
    dto.rank = 1300;

    expect(dto.id).toBeDefined();
    expect(dto.rank).toBeDefined();
  });
});
