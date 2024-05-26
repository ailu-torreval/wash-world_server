import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { VenueDto } from '@venue/dto/venue.dto';
import { Venue } from '@venue/entities/venue.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class VenueService {
  constructor(
    @InjectRepository(Venue)
    private venueRepository: Repository<Venue>,
  ) {}

  async create(venueDto: VenueDto): Promise<Venue> {
    try {
      const createdVenue = this.venueRepository.create(venueDto);
      return await this.venueRepository.save(createdVenue);
    } catch (error) {
      throw new InternalServerErrorException(`Error creating venue: ${error}`);
    }
  }

  async findAll(): Promise<Venue[]> {
    try {
      const venues = await this.venueRepository.find();
      return venues;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching venues'  + error);
    }
  }

  async findAllWithInvoices(): Promise<Venue[]> {
    try {
      const venues = await this.venueRepository.find({ relations: ['invoices']});
      return venues;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching venues'  + error);
    }
  }

  async findOne(id: number): Promise<Venue> {
    const selectedVenue = await this.venueRepository.findOneBy({ id });
    if (selectedVenue) {
      return selectedVenue;
    } else {
      throw new NotFoundException('Venue not found');
    }
  }

 async update(id: number, venueDto: VenueDto): Promise<Venue>{
    try {
      const updatedVenue = await this.venueRepository.update(id, venueDto);
      if (updatedVenue.affected === 1) {
        return this.venueRepository.findOne({
          where: { id },
        });
      }
    } catch (error) {
      throw new NotFoundException(`Venue with id ${id} not found`);
    }  }

  async remove(id: number): Promise<any> {
    const deletedVenue = await this.venueRepository.delete(id);
    if (deletedVenue.affected === 1) {
      return { id: id, status: 'deleted' };
    } else {
      throw new NotFoundException(`Venue with id ${id} not found`);
    }
  }
}
