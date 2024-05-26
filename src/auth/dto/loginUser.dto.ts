import { Role } from "@app/client/entities/role";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto {

  @IsNotEmpty()
  @IsString()
  email: string;


  @IsNotEmpty()
  @IsString()
  password: string;
  
}
