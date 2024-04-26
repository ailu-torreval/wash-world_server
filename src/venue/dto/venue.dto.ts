import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class VenueDto {

    @IsNumber()
    id:number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsNumber()
    zip: number;

    @IsNotEmpty()
    @IsString()   
    city: string;

    @IsNotEmpty()
    @IsNumber()    
    lat: number;

    @IsNotEmpty()
    @IsNumber()    
    lng: number;

    @IsNotEmpty()
    extras: number[];
}
