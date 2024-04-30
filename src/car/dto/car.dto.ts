import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CarDto {
  @IsNotEmpty()
  @IsString()
  license_plate: string;

  @IsNotEmpty()
  @IsNumber()
  client_id: number;
}
