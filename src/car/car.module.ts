import { Module } from '@nestjs/common';
import { CarService } from '@car/car.service';
import { CarController } from '@car/car.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from '@car/entities/car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car])],
  controllers: [CarController],
  providers: [CarService],
  exports: [CarService],
})
export class CarModule {}
