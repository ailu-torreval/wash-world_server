import { Extra } from "src/extra/entities/extra.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @Column()
    lat: number;

    @Column()
    lng: number;

    @ManyToMany(() => Extra)
    @JoinTable()
    extras: Extra[];

    constructor(name: string, address: string, zip: number, city: string, lat: number, lng: number, extras: Extra[]) {
        this.name = name;
        this.address = address;
        this.zip = zip;
        this.city = city;
        this.lat = lat;
        this.lng = lng;
        this.extras = extras;
    }
}
