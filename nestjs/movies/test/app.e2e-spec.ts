import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to Movie API');
  });

  describe('/movies', () => {
    it('/ (GET)', () => {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });

    it('/ (POST)', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({ title: 'Movie Name', year: 2021, genres: ['test'] })
        .expect(201);
    });

    it('/ (POST) 400', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Movie Name',
          year: 2021,
          genres: ['test'],
          more: 'wrong',
        })
        .expect(400);
    });

    it('/ (DELETE)', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });
  });

  describe('movies/:id', () => {
    it('/ (GET)', () => {
      return request(app.getHttpServer()).get('/movies/1').expect(200);
    });

    it('/ (GET) 404', () => {
      return request(app.getHttpServer()).get('/movies/999').expect(404);
    });

    it('/ (PATCH) 200 OK', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({ title: 'New Movie Name' })
        .expect(200);
    });

    it('/ (DELETE) 200 OK', () => {
      return request(app.getHttpServer()).delete('/movies/1').expect(200);
    });

    it('/ (DELETE) 404', () => {
      return request(app.getHttpServer()).delete('/movies/99').expect(404);
    });
  });
});