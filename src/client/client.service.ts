import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientDto } from './dto/client.dto';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CarService } from 'src/car/car.service';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
    private carService: CarService,
  ) {}
  async create(clientDto: ClientDto): Promise<any> {
    const { license_plate, ...rest } = clientDto;
    const createdUser = await this.clientRepository.create(rest);
    const createdCar = await this.carService.create({
      license_plate,
      client: createdUser,
    });
    return this.clientRepository.save(createdUser);
  }

  async findAll(): Promise<Client[]> {
    try {
      const clients = await this.clientRepository.find({ relations: ['cars'] });
      return clients;
    } catch (error) {
      throw new Error('Error fetching clients');
    }
  }

  async findOne(id: number): Promise<any> {
    const selectedUser = await this.clientRepository.findOneBy({ id });
    if (selectedUser) {
      return selectedUser;
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

  async update(id: number, clientDto: ClientDto): Promise<Client> {
    try {
      const { license_plate, ...rest } = clientDto;
      const updatedUser = await this.clientRepository.update(id, rest);
      if (updatedUser.affected === 1) {
        return this.clientRepository.findOne({
          where: { id },
          relations: ['cars'],
        });
      }
    } catch (error) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }
  }

  async remove(id: number) {
    const deletedClient = await this.clientRepository.delete(id);
    if (deletedClient.affected === 1) {
      return { id: id, status: 'deleted' };
    } else {
      throw new NotFoundException(`Client with id ${id} not found`);
    }
  }
}
