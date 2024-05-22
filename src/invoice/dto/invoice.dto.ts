import { IsDate, IsNotEmpty, IsNumber } from "class-validator";

export class InvoiceDto {

    @IsNumber()
    id:number;

    @IsNotEmpty()
    @IsNumber()
    client_id: number;

    @IsNotEmpty()
    @IsNumber()
    venue_id: number;

    @IsNotEmpty()
    @IsNumber()
    washType_id: number;

    @IsNumber()
    extras_ids: number[];

    @IsNotEmpty()
    @IsNumber()
    total_amount: number;

    @IsNotEmpty()
    @IsNumber()
    points_earned: number;

    @IsNotEmpty()
    @IsNumber()
    points_redeemed: number;

}
