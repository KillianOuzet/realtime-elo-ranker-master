import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Match {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  winner: string;

  @Column()
  loser: string;

  @Column()
  draw: boolean;
}
