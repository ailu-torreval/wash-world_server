import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';
import { Client } from '@client/entities/client.entity';

export class CarDto {
  @IsNotEmpty()
  @IsString()
  license_plate: string;

  @IsNotEmpty()
  client: Client;
}
