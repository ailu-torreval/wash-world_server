import { Injectable } from '@nestjs/common';
import { ClientDto } from './dto/client.dto';

@Injectable()
export class ClientService {
  create(clientDto: ClientDto) {
    return 'This action adds a new client';
  }

  findAll() {
    return `This action returns all client`;
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, clientDto: ClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
