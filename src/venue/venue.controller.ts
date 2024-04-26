import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VenueService } from './venue.service';
import { VenueDto } from './dto/venue.dto';

@Controller('venue')
export class VenueController {
  constructor(private readonly venueService: VenueService) {}

  @Post()
  create(@Body() venueDto: VenueDto) {
    return this.venueService.create(venueDto);
  }

  @Get()
  findAll() {
    return this.venueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.venueService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() venueDto: VenueDto) {
    return this.venueService.update(+id, venueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.venueService.remove(+id);
  }
}
