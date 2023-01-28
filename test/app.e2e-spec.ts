import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { SignInDto, SignUpDto } from '../src/auth/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
    await app.listen(5554);
    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:5554');
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    describe('SignUp', () => {
      it('should throw exception if email empty', () => {
        const dto = {
          username: 'dychkos',
          password: 'super_$ecret',
        };
        return pactum
          .spec()
          .post('/auth/sign-up')
          .withBody(dto)
          .expectStatus(400);
      });

      it('should throw exception if username empty', () => {
        const dto = {
          email: 'dychkosergey@gmail.com',
          password: 'super_$ecret',
        };
        return pactum
          .spec()
          .post('/auth/sign-up')
          .withBody(dto)
          .expectStatus(400);
      });

      it('should throw exception if password empty', () => {
        const dto = {
          username: 'dychkos',
          email: 'dychkosergey@gmail.com',
        };
        return pactum
          .spec()
          .post('/auth/sign-up')
          .withBody(dto)
          .expectStatus(400);
      });

      it('should be SignUp', () => {
        const dto: SignUpDto = {
          username: 'dychkos',
          email: 'dychkosergey@gmail.com',
          password: 'super_$ecret',
        };
        return pactum
          .spec()
          .post('/auth/sign-up')
          .withBody(dto)
          .expectStatus(201);
      });
    });
    describe('SignIn', () => {
      it('should be SignIn', () => {
        const dto: SignInDto = {
          username: 'dychkos',
          password: 'super_$ecret',
        };

        return pactum
          .spec()
          .post('/auth/sign-in')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'access_token');
      });
    });
  });

  describe('User', () => {
    describe('GetMe', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({ Authorization: `Bearer $S{userAt}` })
          .expectStatus(200);
      });
    });
    describe('EditMe', () => {});
  });

  it.todo('have to pass');
});
