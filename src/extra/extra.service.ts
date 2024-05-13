import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ExtraDto } from '@extra/dto/extra.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Extra } from '@extra/entities/extra.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExtraService {
  constructor(
    @InjectRepository(Extra)
    private extraRepository: Repository<Extra>,
  ) {}

  async create(extraDto: ExtraDto): Promise<Extra> {
    try {
      const createdExtra = this.extraRepository.create(extraDto);
      return await this.extraRepository.save(createdExtra);
    } catch (error) { 
      throw new InternalServerErrorException('Error creating extra' + error);
    }
  }

  async findAll(): Promise<Extra[]> {
    try {
      const extras = await this.extraRepository.find();
      return extras;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching extras' + error);
    }
  }

  async findOne(id: number): Promise<Extra> {
    const selectedExtra = await this.extraRepository.findOneBy({ id });
    if (selectedExtra) {
      return selectedExtra;
    } else {
      throw new NotFoundException(`Extra with id ${id} not found`);
    }
  }

  async update(id: number, extraDto: ExtraDto): Promise<Extra> {
    try {
      const updatedExtra = await this.extraRepository.update(id, extraDto);
      if (updatedExtra.affected === 1) {
        return this.extraRepository.findOne({
          where: { id },
        });
      }
    } catch (error) {
      throw new NotFoundException(`Extra with id ${id} not found`);
    }
  }

  async remove(id: number): Promise<any> {
    const deletedExtra = await this.extraRepository.delete(id);
    if (deletedExtra.affected === 1) {
      return { id: id, status: 'deleted' };
    } else {
      throw new NotFoundException(`Extra with id ${id} not found`);
    }
  }
}
