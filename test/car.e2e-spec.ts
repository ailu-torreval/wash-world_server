import { Test, TestingModule } from '@nestjs/testing';
import { CarService } from '@car/car.service';
import { ClientService } from '@client/client.service';
import { INestApplication } from '@nestjs/common';
import { CarDto } from '@car/dto/car.dto';
import { Role } from '@app/client/entities/role';
import { MockClientService } from './client-mock.service';
import { AppModule } from '@app/app.module';
import { Connection } from 'typeorm';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { testConfig } from '../ormconfig.test';
import { CarModule } from '@app/car/car.module';
import { ClientModule } from '@app/client/client.module';

describe('CarService (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;
  let carService: CarService;
  let clientService: ClientService;
  let connection: Connection;

  beforeEach(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(testConfig),
        CarModule,
        ClientModule
      ],
    })
      .overrideProvider(ClientService)
      .useClass(MockClientService)
      .compile();

    carService = moduleFixture.get<CarService>(CarService);
    clientService = moduleFixture.get<ClientService>(ClientService);
    connection = moduleFixture.get(Connection);
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('create', () => {
    it('should create a car', async () => {
      // Arrange
      const mockClient = await clientService.create({
        firstname: 'test',
        lastname: 'test',
        email: 'test@mail.com',
        password: 'test',
        license_plate: 'mock123',
        role: Role.User,
      });

      const carDto: CarDto = {
        license_plate: 'test123',
        client: mockClient,
      };
      console.log(carDto);
 
      const response = await request(app.getHttpServer())
        .post('/car')
        .send(carDto);

        if (response.status !== 201) {
          console.error(response.body);
        }
        
        expect(response.status).toEqual(201);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
