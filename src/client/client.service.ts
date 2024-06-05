import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ClientDto } from '@client/dto/client.dto';
import { Client } from '@client/entities/client.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CarService } from '@car/car.service';
import { Invoice } from '@invoice/entities/invoice.entity';
import { UpdateClientDto } from '@client/dto/updateClient.dto';
import { InvoiceDto } from '@invoice/dto/invoice.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
    private carService: CarService,
  ) {}

  async create(clientDto: ClientDto): Promise<Client> {
    try {
      const { license_plate, ...rest } = clientDto;
      const newUser = { ...rest, reward_points_balance: 50 };
      const createdUser = this.clientRepository.create(newUser);
      const savedUser = await this.clientRepository.save(createdUser);
      const createdCar = await this.carService.create({
        license_plate,
        client: savedUser,
      });

      return { ...savedUser, cars: [createdCar] };
    } catch (error) {
      throw new Error('Error creating client');
    }
  }

  async findAll(): Promise<Client[]> {
    try {
      const clients = await this.clientRepository.find({ relations: ['cars'] });
      return clients;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching clients' + error);
    }
  }

  async findOne(id: number): Promise<Partial<Client>> {
    const selectedUser = await this.clientRepository.findOne({
      where: { id },
      relations: ['cars'],
      join: {
        alias: 'client',
        leftJoinAndSelect: {
          invoices: 'client.invoices',
          invoiceExtras: 'invoices.extras',
          invoiceWashType: 'invoices.washType',
          invoiceVenue: 'invoices.venue',
        }}
    });
    if (selectedUser) {
      const { password, ...cleanUser } = selectedUser;
      return cleanUser;
    } else {
      throw new NotFoundException(`Client with id ${id} not found`);
    }
  }

  async findByEmail(email: string): Promise<Client> {
    const selectedUser = await this.clientRepository.findOne({
      where: { email },
    });
    if (selectedUser) {
      return selectedUser;
    } else {
      throw new Error();
    }
  }

  async findClientInvoices(id: number): Promise<Invoice[]> {
    const selectedUser = await this.clientRepository.findOne({
      where: { id },
      relations: ['invoices', 'invoices.venue', 'invoices.extras', 'invoices.washType'],
    });
    if (selectedUser) {
      return selectedUser.invoices;
    } else {
      throw new NotFoundException(`Client with id ${id} not found`);
    }
  }

  async update(id: number, clientDto: UpdateClientDto): Promise<Client> {
    try {
      const updatedUser = await this.clientRepository.update(id, clientDto);
      if (updatedUser.affected === 1) {
        return this.clientRepository.findOne({
          where: { id },
          relations: ['cars', 'invoices'],
        });
      }
    } catch (error) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }
  }

  async checkClientBalanceAndUpdate(
    invoice: InvoiceDto,
  ): Promise<Partial<Client>> {
    try {
const client = await this.clientRepository.findOne({
  where: { id: invoice.client_id },
  relations: ['cars'],
  join: {
    alias: 'client',
    leftJoinAndSelect: {
      invoices: 'client.invoices',
      invoiceExtras: 'invoices.extras',
      invoiceWashType: 'invoices.washType',
      invoiceVenue: 'invoices.venue',
    },
  },
});
      
      if (!client) {
        throw new NotFoundException(`Client with id ${invoice.client_id} not found`);
      }

      if (invoice.points_redeemed > 0 || invoice.points_earned > 0) {
        if (
          client.reward_points_balance !== null &&
          client.reward_points_balance >= invoice.points_redeemed
        ) {
          client.reward_points_balance =
            client.reward_points_balance -
            invoice.points_redeemed +
            invoice.points_earned;
          const updatedClient = await this.clientRepository.save(client);
          const { password, ...cleanClient } = updatedClient;
          return cleanClient;
        } else {
          throw new InternalServerErrorException(
            `Client with id ${invoice.client_id} does not have enough points to redeem`,
          );
        }
      } else {
        const { password, ...cleanClient } = client;

        return cleanClient;
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    try {
      await this.carService.deleteClientCars(id);
      const deletedClient = await this.clientRepository.delete(id);
      if (deletedClient.affected === 1) {
        return { id: id, status: 'deleted' };
      } else {
        throw new NotFoundException(`Client with id ${id} not found`);
      }
    } catch(error) {
      throw new InternalServerErrorException(error);
    }
  }
}
