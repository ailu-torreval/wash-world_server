import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { dbConfig } from 'data.source';
import { ClientModule } from './client/client.module';
import { ExtraModule } from './extra/extra.module';
import { InvoiceModule } from './invoice/invoice.module';
import { WashTypeModule } from './wash_type/wash_type.module';
import { VenueModule } from './venue/venue.module';
import { AuthModule } from './auth/auth.module';
import { CarModule } from './car/car.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dbConfig),
    ClientModule,
    ExtraModule,
    InvoiceModule,
    WashTypeModule,
    VenueModule,
    AuthModule,
    CarModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
