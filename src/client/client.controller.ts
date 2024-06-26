import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { ClientService } from '@client/client.service';
import { ClientDto } from '@client/dto/client.dto';
import { UpdateClientDto } from '@client/dto/updateClient.dto';

@Controller('client')
export class ClientController {
  constructor(private clientService: ClientService,
  ) {}

  @Post()
  create(@Body() clientDto: ClientDto) {
    return this.clientService.create(clientDto);
  }

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(+id);
  }

  @Get(':id/invoices')
  findInvoices(@Param('id') id: string) {
    // return this.invoiceService.findInvoicesFromUser(+id);
    return this.clientService.findClientInvoices(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateclientDto: UpdateClientDto) {
    return this.clientService.update(+id, updateclientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }
}
