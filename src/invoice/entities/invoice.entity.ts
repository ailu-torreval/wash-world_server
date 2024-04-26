import { Extra } from "src/extra/entities/extra.entity";
import { Venue } from "src/venue/entities/venue.entity";
import { Client } from "src/client/entities/client.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Invoice {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Client)
    @JoinColumn()
    client: Client;

    @OneToOne(() => Venue)
    @JoinColumn()
    venue: Venue;

    @ManyToMany(() => Extra)
    @JoinTable()
    extras: Extra[];

    @Column()
    date: Date;

    @Column()
    total_amount: number;

    @Column()
    points_earned: number;

    @Column()
    points_redeemed: number;
}
