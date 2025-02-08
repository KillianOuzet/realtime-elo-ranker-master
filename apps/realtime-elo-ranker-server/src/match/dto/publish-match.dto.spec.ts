import { PublishMatchDto } from './publish-match.dto';

describe('PublishMatchDto', () => {
  it('should create an instance of PublishMatchDto', () => {
    const dto = new PublishMatchDto();
    dto.winner = 'Player1';
    dto.loser = 'Player2';
    dto.draw = false;

    expect(dto).toBeInstanceOf(PublishMatchDto);
    expect(dto.winner).toBe('Player1');
    expect(dto.loser).toBe('Player2');
    expect(dto.draw).toBe(false);
  });

  it('should validate the properties of PublishMatchDto', () => {
    const dto = new PublishMatchDto();
    dto.winner = 'Player1';
    dto.loser = 'Player2';
    dto.draw = false;

    expect(dto.winner).toBeDefined();
    expect(dto.loser).toBeDefined();
    expect(dto.draw).toBeDefined();
  });
});
