import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ExtraDto {

  @IsNumber()
  id:number;
  
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  icon: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  points_price: number;
}
