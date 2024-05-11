import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Role } from './role';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { Car } from 'src/car/entities/car.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({default: 0})
  reward_points_balance: number;

  @Column({
    type: 'enum',
    enum: Role,
    default: [Role.User],
  })
  role: Role;

  @OneToMany(() => Invoice, (invoice) => invoice.client)
  invoices: Invoice[];

  @OneToMany(()=> Car, (car)=> car.client)
  cars: Car[];

  constructor(firstname: string, lastname: string, password: string, email: string, role?: Role) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.password = password;
    this.email = email;
    this.role = role || Role.User;
  }
}
