import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CarDto } from '@car/dto/car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from '@car/entities/car.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CarService {

  constructor(
    @InjectRepository(Car)
    private carRepository: Repository<Car>,
  ) {}

  async create(carDto: CarDto): Promise<Car> {
    try {
      const createdCar = this.carRepository.create(carDto);
      const savedCar = await this.carRepository.save(createdCar);
      const { client, ...carData } = savedCar;
      return { ...carData };
    } catch(error) {
      throw new InternalServerErrorException('Error creating car' + error);
    }
  }

  async findAll(): Promise<Car[]> {
    const cars = await this.carRepository.find();
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
