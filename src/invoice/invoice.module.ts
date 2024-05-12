import { Module, forwardRef } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { Extra } from 'src/extra/entities/extra.entity';
import { ClientModule } from 'src/client/client.module';
import { VenueModule } from 'src/venue/venue.module';
import { VenueService } from 'src/venue/venue.service';
import { ExtraModule } from 'src/extra/extra.module';

@Module({
  imports: [
    // forwardRef is used to avoid circular dependencies
    TypeOrmModule.forFeature([Invoice, Extra]),
    forwardRef(() => ClientModule),
    VenueModule,
    // ExtraModule
    ],
  controllers: [InvoiceController],
  providers: [InvoiceService],
  exports: [InvoiceService],
})
export class InvoiceModule {}
