import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WashType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  icon: string;

  @Column()
  price: number;

  @Column()
  points_reward: number;

  constructor(
    name: string,
    description: string,
    price: number,
    points_reward: number,
    icon: string
  ) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.points_reward = points_reward;
    this.icon = icon;
  }
}
