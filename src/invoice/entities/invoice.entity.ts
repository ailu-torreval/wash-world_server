import { Extra } from "@extra/entities/extra.entity";
import { Venue } from "@venue/entities/venue.entity";
import { Client } from "@client/entities/client.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { WashType } from "@app/wash_type/entities/wash_type.entity";

@Entity()
export class Invoice {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Client)
    @JoinColumn()
    client: Client;
  
    @ManyToOne(() => Venue)
    @JoinColumn()
    venue: Venue;
  
    @ManyToOne(() => WashType)
    @JoinColumn()
    washType: WashType;

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

    constructor(client: Client, venue: Venue, extras: Extra[], total_amount: number, points_earned: number, points_redeemed: number,washType: WashType, date?: Date) {
        this.client = client;
        this.venue = venue;
        this.extras = extras;
        this.date = date;
        this.total_amount = total_amount;
        this.points_earned = points_earned;
        this.washType = washType;
        this.points_redeemed = points_redeemed;
    }
}
