import { Player } from './player.entity';

describe('Player Entity', () => {
  it('should create an instance of Player', () => {
    const player = new Player();
    player.id = 'JohnDoe';
    player.rank = 1200;

    expect(player).toBeInstanceOf(Player);
    expect(player.id).toBe('JohnDoe');
    expect(player.rank).toBe(1200);
  });

  it('should validate the properties of Player', () => {
    const player = new Player();
    player.id = 'JohnDoe';
    player.rank = 1200;

    expect(player.id).toBeDefined();
    expect(player.rank).toBeDefined();
  });
});
