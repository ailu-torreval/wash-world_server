import { Invoice } from "@invoice/entities/invoice.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Venue {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    zip: number;

    @Column()
    city: string;

    @Column({ type: 'float'})
    lat: number;

    @Column({ type: 'float'})
    lng: number;

    @OneToMany(() => Invoice, invoice => invoice.venue)
    invoices: Invoice[];

    constructor(name?: string, address?: string, zip?: number, city?: string, lat?: number, lng?: number) {
        this.name = name;
        this.address = address;
        this.zip = zip;
        this.city = city;
        this.lat = lat;
        this.lng = lng;
    }
}
