import { Client } from "src/client/entities/client.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Car {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    license_plate: string;

    @ManyToOne(() => Client, (client) => client.cars)
    client: Client;

    constructor(license_plate: string, client: Client) {
        this.license_plate = license_plate;
        this.client = client;
    }
}
