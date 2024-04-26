import { Injectable } from '@nestjs/common';
import { CarDto } from './dto/car.dto';

@Injectable()
export class CarService {
  create(carDto: CarDto) {
    return 'This action adds a new car';
  }

  findAll() {
    return `This action returns all car`;
  }

  findOne(id: number) {
    return `This action returns a #${id} car`;
  }

  update(id: number, carDto: CarDto) {
    return `This action updates a #${id} car`;
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }
}
