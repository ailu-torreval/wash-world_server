import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { Connection, Repository } from 'typeorm';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Client } from '@client/entities/client.entity';
import { ClientService } from '@client/client.service';
import { AuthService } from '@auth/auth.service';
import { testConfig } from '../ormconfig.test';
import { ClientModule } from '@app/client/client.module';
import { AuthModule } from '@app/auth/auth.module';
import { Car } from '@car/entities/car.entity';
import { CarModule } from '@car/car.module';

describe('clientController (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;
  let clientRepository: Repository<Client>
  let carRepository: Repository<Car>
  let clientService: ClientService;
  let authService: AuthService
  let connection: Connection

  beforeEach(async () => {

    // prepare the module

    moduleFixture = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(testConfig),
        ClientModule,
        CarModule,
        AuthModule
      ],
    }).compile();

    clientService = moduleFixture.get(ClientService);
    authService = moduleFixture.get(AuthService);
    clientRepository = moduleFixture.get(getRepositoryToken(Client));
    // await clientRepository.query("DELETE FROM client")

    connection = moduleFixture.get(Connection)
    app = moduleFixture.createNestApplication();
    await app.init();

  });

  describe('Signup', () => {
    it('should create a client', async () => {
      const testUser = {
        "firstname": "testy",
        "lastname": "testinson",
        "email": "test1@mail.com",
        "password": "qwerty",
        "license_plate": "test123"
    };
        // Act
      const {body} = await request(app.getHttpServer())
                        .post('/auth/signup')
                        .send(testUser)
                        .expect(201)


      // Assert
      expect(body.email).toEqual("test1@mail.com");
      expect(body.role).toEqual("user");
      expect(body.id).toBeDefined();
    });
})


afterAll(async () => {
  if (app) {
    // await carRepository.delete({ license_plate: "test123" });
    // await clientRepository.delete({ email: "test1@mail.com" });
    app.close();
  }
});
});
