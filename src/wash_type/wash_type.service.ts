import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { WashTypeDto } from '@wash_type/dto/wash_type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WashType } from '@wash_type/entities/wash_type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WashTypeService {

  constructor(
    @InjectRepository(WashType)
    private washTypeRepository: Repository<WashType>,
  ) { }

  async create(washTypeDto: WashTypeDto): Promise<WashType> {
    try {
      const createdWashType = this.washTypeRepository.create(washTypeDto);
      return await this.washTypeRepository.save(createdWashType);
    } catch (error) {
      throw new InternalServerErrorException('Error creating washType' + error);
    }
  }

  async findAll(): Promise<WashType[]> {
    try {
      const washTypes = await this.washTypeRepository.find();
      return washTypes;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching washTypes' + error);
    }
  }

  async findOne(id: number): Promise<WashType> {
    const selectedWashType = await this.washTypeRepository.findOneBy({ id });
    if (selectedWashType) {
      return selectedWashType;
    } else {
      throw new NotFoundException(`Wash type with id ${id} not found`);
    }  
  }

  async update(id: number, washTypeDto: WashTypeDto): Promise<WashType> {
    try {
      const updatedWashType = await this.washTypeRepository.update(id, washTypeDto);
      if (updatedWashType.affected === 1) {
        return this.washTypeRepository.findOne({
          where: { id },
        });
      }
    } catch (error) {
      throw new NotFoundException(`WashType with id ${id} not found`);
    }  }

  async remove(id: number): Promise<any> {
    const deletedWashType = await this.washTypeRepository.delete(id);
    if (deletedWashType.affected === 1) {
      return { id: id, status: 'deleted' };
    } else {
      throw new NotFoundException(`WashType with id ${id} not found`);
    }
  }
}
