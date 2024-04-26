import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class WashTypeDto {

    @IsNumber()
    id:number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsNumber()
    points_reward: number;

}
