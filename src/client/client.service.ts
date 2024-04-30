import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientDto } from './dto/client.dto';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClientService {

  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}
  async create(clientDto: ClientDto): Promise<any> {
    const createdUser = await this.clientRepository.create(clientDto);
    return this.clientRepository.save(createdUser);
  }

  async findAll(): Promise<Client[]> {
    const clients = await this.clientRepository.find();
    return clients;
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
    if(selectedUser) {
      return selectedUser
    } else {
      throw new Error
    }
  }

  async update(id: number, clientDto: ClientDto) {
    return `This action updates a #${id} client`;
  }

  async remove(id: number) {
    const deletedClient = await this.clientRepository.delete(id);
    if (deletedClient.affected === 1) {
      return { id: id, status: 'deleted' };
    } else {
      throw new NotFoundException(`Client with id ${id} not found`);
    }
    return {"id": id, "status": "deleted"}; 
  }
}
