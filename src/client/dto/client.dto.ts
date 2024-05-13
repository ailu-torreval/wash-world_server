import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ClientDto {
    
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
    @IsString()
    password: string;
    
    @IsNotEmpty()
    @IsString()
    license_plate: string;
  
}
