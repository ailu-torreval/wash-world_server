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
}
