import { Injectable } from '@nestjs/common';
import { VenueDto } from './dto/venue.dto';

@Injectable()
export class VenueService {
  create(venueDto: VenueDto) {
    return 'This action adds a new venue';
  }

  findAll() {
    return `This action returns all venue`;
  }

  findOne(id: number) {
    return `This action returns a #${id} venue`;
  }

  update(id: number, venueDto: VenueDto) {
    return `This action updates a #${id} venue`;
  }

  remove(id: number) {
    return `This action removes a #${id} venue`;
  }
}
