import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Connection, Repository } from 'typeorm';
import { Client } from 'src/client/entities/client.entity';
import { ClientService } from 'src/client/client.service';
import { AuthService } from 'src/auth/auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('clientController (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;
  let clientRepository: Repository<Client>
  let clientService: ClientService;
  let authService: AuthService
  let connection: Connection

  beforeEach(async () => {

    // prepare the module

     moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    clientService = moduleFixture.get(ClientService);
    authService = moduleFixture.get(AuthService);
    clientRepository = moduleFixture.get(getRepositoryToken(Client));
    await clientRepository.query("DELETE FROM client")

    connection = moduleFixture.get(Connection)
    app = moduleFixture.createNestApplication();
    await app.init();

  });

  describe('Signup', () => {
    it('should create a client', async () => {
      const testUser = {
        firstname: 'tester',
        lastname: 'testinson',
        email: 'tester@mail.com',
        password: 'qwerty',
        license_plate: 'abc123',
      };
        // Act
      const {body} = await request(app.getHttpServer())
                        .post('/auth/signup')
                        .send(testUser)
                        .expect(201)


      // Assert
      expect(body.password).toMatch(/^\$2[aby]\$.{56}$/); // test if pass is hashed
      expect(body.email).toEqual("test@mail.com");
      expect(body.role).toEqual("user");
      expect(body.id).toBeDefined();
    });
})


  afterAll(() => {
    app.close();
  });
});
