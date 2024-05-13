import { Module } from '@nestjs/common';
import { InvoiceService } from '@invoice/invoice.service';
import { InvoiceController } from '@invoice/invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from '@invoice/entities/invoice.entity';
import { Extra } from '@extra/entities/extra.entity';
import { ClientModule } from '@client/client.module';
import { VenueModule } from '@venue/venue.module';

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
