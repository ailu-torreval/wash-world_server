import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Extra {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    icon: string;

    @Column()
    price: number;

    @Column()
    points_price: number;

    constructor(name: string, icon: string, price: number, points_price: number) {
        this.name = name;
        this.icon = icon;
        this.price = price;
        this.points_price = points_price;
    }

}
