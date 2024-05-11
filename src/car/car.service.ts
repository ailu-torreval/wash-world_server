import { Injectable, NotFoundException } from '@nestjs/common';
import { CarDto } from './dto/car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CarService {

  constructor(
    @InjectRepository(Car)
    private carRepository: Repository<Car>,
  ) {}

  async create(carDto: CarDto): Promise<Car> {
    try {
      const createdCar = await this.carRepository.create(carDto);
      return this.carRepository.save(createdCar);
    } catch(error) {
      throw new Error('Error creating car');
    }
  }

  async findAll(): Promise<Car[]> {
    const cars = await this.carRepository.find({
      relations: ['client'],
    });
    return cars;
  }

  async findOne(id: number): Promise<Car> {
    try {
      const selectedCar = await this.carRepository.findOne({
        where: { id },
        relations: ['client'],
      });
      if (selectedCar) {
        return selectedCar;
      }
    } catch(error) {
      throw new NotFoundException('Car not found');
    }
  }

  async update(id: number, carDto: CarDto): Promise<Car>{
    try {
     await this.carRepository.update(id, carDto);
      return this.carRepository.findOne({
        where: { id },
        relations: ['client'],
      });
    } catch(error) {
      throw new NotFoundException('Car not found');
    }
  }

  async remove(id: number): Promise<any>{
    const deletedCar = await this.carRepository.delete(id);
    if (deletedCar.affected === 1) {
      return { id: id, status: 'deleted' };
    } else {
      throw new NotFoundException(`Client with id ${id} not found`);
    }  }
}
