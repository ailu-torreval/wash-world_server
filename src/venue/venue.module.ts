import { Module } from '@nestjs/common';
import { VenueService } from '@venue/venue.service';
import { VenueController } from '@venue/venue.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venue } from '@venue/entities/venue.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Venue])],
  controllers: [VenueController],
  providers: [VenueService],
  exports: [VenueService],
})
export class VenueModule {}
