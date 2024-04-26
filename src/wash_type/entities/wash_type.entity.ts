import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class WashType {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    points_reward: number;
    
}
