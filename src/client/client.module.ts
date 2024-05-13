import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { CarModule } from 'src/car/car.module';

@Module({
  // forwardRef is used to avoid circular dependencies
  imports: [
    TypeOrmModule.forFeature([Client]),
    CarModule,
  ],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService],
})
export class ClientModule {}
