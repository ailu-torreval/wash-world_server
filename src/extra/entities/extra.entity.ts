import { Invoice } from "src/invoice/entities/invoice.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Extra {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    points_price: number;

    constructor(name: string, description: string, price: number, points_price: number) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.points_price = points_price;
    }

}
