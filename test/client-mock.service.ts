import { ClientService } from "@app/client/client.service";
import { Client } from "@app/client/entities/client.entity";

export class MockClientService extends ClientService {
  async create(): Promise<Client> {
    const client = new Client("mock","client", "password", "mock@mail.com");
    client.id = 1;
    return {...client};
  }
}