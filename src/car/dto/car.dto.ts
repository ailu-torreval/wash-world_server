import { IsNotEmpty, IsString } from 'class-validator';

export class CarDto {
  @IsNotEmpty()
  @IsString()
  license_plate: string;
}
