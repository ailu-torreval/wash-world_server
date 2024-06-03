import { ClientService } from "@app/client/client.service";
import { ClientDto } from "@app/client/dto/client.dto";
import { Client } from "@app/client/entities/client.entity";

export class MockClientService extends ClientService {
  async create(clientDto: ClientDto): Promise<Client> {
    const client = new Client("mock","client", "password", "mock@mail.com");
    client.id = 1;
    console.log("client from mock", client)
    // Set other properties as needed
    return {...client};
  }
}