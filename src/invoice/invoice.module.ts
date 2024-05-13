import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { Extra } from 'src/extra/entities/extra.entity';
import { ClientModule } from 'src/client/client.module';
import { VenueModule } from 'src/venue/venue.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Invoice, Extra]),
    ClientModule,
    VenueModule,
    ],
  controllers: [InvoiceController],
  providers: [InvoiceService],
  exports: [InvoiceService],
})
export class InvoiceModule {}
