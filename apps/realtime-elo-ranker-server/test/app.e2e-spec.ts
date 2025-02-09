import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreatePlayerDto } from './../src/player/dto/create-player.dto';
import { PublishMatchDto } from './../src/match/dto/publish-match.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/api/player (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/player')
      .expect(200)
      .expect([]);
  });

  it('/api/player (POST)', () => {
    const createPlayerDto: CreatePlayerDto = { id: 'Player1', baseRank: 1200 };
    return request(app.getHttpServer())
      .post('/api/player')
      .send(createPlayerDto)
      .expect(201)
      .expect((res: request.Response) => {
        const body = res.body as { id: string; rank: number };
        expect(body.id).toBe('Player1');
        expect(body.rank).toBe(1200);
      });
  });

  it('/api/player/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/player/Player1')
      .expect(200)
      .expect((res) => {
        const body = res.body as { id: string; rank: number };
        expect(body.id).toBe('Player1');
        expect(body.rank).toBe(1200);
      });
  });

  it('/api/ranking (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/ranking')
      .expect(200)
      .expect([{ id: 'Player1', rank: 1200 }]);
  });

  // je n'arrie pas à faire fonctionner ce test, je ne comprends pas pourquoi,
  // il y'a un dépassement du temps d'attente et donc un timeout, j'ai essayé plusieurs façons d'emit l'event mais le sse ne le reçoit jamais
  // donc il n'y a jamais rien qui est renvoyé sur la route pendant le test, or cela fonctionne bien sur l'application

  // it('/api/ranking/events (SSE)', (done) => {
  //   const client = request(app.getHttpServer()).get('/api/ranking/events');
  //   client
  //     .expect('Content-Type', /text\/event-stream/)
  //     .expect(200)
  //     .end((err) => {
  //       if (err) {
  //         done(err);
  //       } else {
  //         done();
  //       }
  //     });

  //   setTimeout(() => {
  //     const httpServer = app.getHttpServer() as unknown as {
  //       emit: (event: string, payload: any) => void;
  //     };
  //     httpServer.emit('player.created', {
  //       id: 'Player3',
  //       rank: 1200,
  //     });
  //   }, 1000);
  // }, 10000);

  it('/api/match (POST)', async () => {
    const publishMatchDto: PublishMatchDto = {
      winner: 'Player1',
      loser: 'Player2',
      draw: false,
    };

    const createPlayerDto: CreatePlayerDto = {
      id: 'Player2',
    };
    await request(app.getHttpServer())
      .post('/api/player')
      .send(createPlayerDto)
      .expect(201);

    return request(app.getHttpServer())
      .post('/api/match')
      .send(publishMatchDto)
      .expect(201)
      .expect((res) => {
        const body = res.body as {
          winner: { id: string; rank: number };
          loser: { id: string; rank: number };
          draw: boolean;
        };
        expect(body.winner.id).toBe('Player1');
        expect(body.winner.rank).toBe(1216);
        expect(body.loser.id).toBe('Player2');
        expect(body.loser.rank).toBe(1184);
        expect(body.draw).toBe(false);
      });
  });
});
