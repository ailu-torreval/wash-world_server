import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Connection, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppModule } from '@app/app.module';
import { Client } from '@client/entities/client.entity';
import { ClientService } from '@client/client.service';
import { AuthService } from '@auth/auth.service';

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

    connection = moduleFixture.get(Connection)
    app = moduleFixture.createNestApplication();
    await app.init();

    try {
      // Try to perform a simple query
      const result = await clientRepository.find();
      console.log('Database connection successful. Number of clients:', result.length);
    } catch (error) {
      console.error('Failed to connect to the database:', error);
    }

  });

  describe('Signup', () => {
    it('should create a client', async () => {
      const testUser = {
        "firstname": "test",
        "lastname": "testinson",
        "email": "test@mail.com",
        "password": "qwerty",
        "license_plate": "abc123"
    };
        // Act
      const {body} = await request(app.getHttpServer())
                        .post('/auth/signup')
                        .send(testUser)
                        .expect(201)


      // Assert
      // expect(body.password).toMatch(/^\$2[aby]\$.{56}$/); // test if pass is hashed
      expect(body.email).toEqual("test@mail.com");
      expect(body.role).toEqual("user");
      expect(body.id).toBeDefined();
    });
})


afterAll(() => {
  if (app) {
    app.close();
  }
});
});
