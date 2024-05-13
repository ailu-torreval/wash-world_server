import { Module } from '@nestjs/common';
import { ClientService } from '@client/client.service';
import { ClientController } from '@client/client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from '@client/entities/client.entity';
import { CarModule } from '@car/car.module';

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
