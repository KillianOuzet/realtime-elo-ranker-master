import { UpdateMatchDto } from './update-match.dto';

describe('UpdateMatchDto', () => {
  it('should create an instance of UpdateMatchDto', () => {
    const dto = new UpdateMatchDto();
    dto.winner = 'Player1';
    dto.loser = 'Player2';
    dto.draw = true;

    expect(dto).toBeInstanceOf(UpdateMatchDto);
    expect(dto.winner).toBe('Player1');
    expect(dto.loser).toBe('Player2');
    expect(dto.draw).toBe(true);
  });

  it('should validate the properties of UpdateMatchDto', () => {
    const dto = new UpdateMatchDto();
    dto.winner = 'Player1';
    dto.loser = 'Player2';
    dto.draw = true;

    expect(dto.winner).toBeDefined();
    expect(dto.loser).toBeDefined();
    expect(dto.draw).toBeDefined();
  });
});
