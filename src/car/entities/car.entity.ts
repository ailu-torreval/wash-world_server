import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Car {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    license_plate: string;
}
