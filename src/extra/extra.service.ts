import { Injectable, NotFoundException } from '@nestjs/common';
import { ExtraDto } from './dto/extra.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Extra } from './entities/extra.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExtraService {
  constructor(
    @InjectRepository(Extra)
    private extraRepository: Repository<Extra>,
  ) {}

  async create(extraDto: ExtraDto): Promise<Extra> {
    const createdExtra = await this.extraRepository.create(extraDto);
    return this.extraRepository.save(createdExtra);
  }

  async findAll(): Promise<Extra[]> {
    const extras = await this.extraRepository.find();
    return extras;
  }

  async findOne(id: number): Promise<Extra> {
    const selectedExtra = await this.extraRepository.findOneBy({ id });
    if (selectedExtra) {
      return selectedExtra;
    } else {
      throw new NotFoundException(`Extra with id ${id} not found`);
    }
  }

  async update(id: number, extraDto: ExtraDto) {
    // return `This action updates a #${id} extra`;
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
