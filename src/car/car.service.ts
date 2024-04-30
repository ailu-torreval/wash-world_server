import { Injectable } from '@nestjs/common';
import { CarDto } from './dto/car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CarService {

  constructor(
    @InjectRepository(Car)
    private carRepository: Repository<Car>
  ) {}

  async create(carDto: CarDto): Promise<Car> {
    const createdCar = await this.carRepository.create(carDto);
    return this.carRepository.save(createdCar);
  }

  async findAll() {
    return `This action returns all car`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} car`;
  }

  async update(id: number, carDto: CarDto) {
    return `This action updates a #${id} car`;
  }

  async remove(id: number) {
    return `This action removes a #${id} car`;
  }
}
