import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateClientDto {

    @IsNumber()
    id:number;
    
    @IsNotEmpty()
    @IsString()
    firstname: string;
    
    @IsNotEmpty()
    @IsString()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    lastname: string;

    @IsNotEmpty()
    @IsNumber()
    reward_points_balance: number;
  
}
