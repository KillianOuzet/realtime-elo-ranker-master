import { Player } from './../../player/entities/player.entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Match {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column(() => Player)
  winner: Player;

  @Column(() => Player)
  loser: Player;

  @Column()
  draw: boolean;
}
