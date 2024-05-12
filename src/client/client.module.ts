import { Module, forwardRef } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { CarModule } from 'src/car/car.module';
import { InvoiceModule } from 'src/invoice/invoice.module';

@Module({
  // forwardRef is used to avoid circular dependencies
  imports: [
    TypeOrmModule.forFeature([Client]),
    CarModule,
    forwardRef(() => InvoiceModule),
  ],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService],
})
export class ClientModule {}
