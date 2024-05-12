import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientDto } from './dto/client.dto';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { InvoiceService } from 'src/invoice/invoice.service';

@Controller('client')
export class ClientController {
  constructor(private clientService: ClientService,
    private invoiceService: InvoiceService
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
    return this.invoiceService.findInvoicesFromUser(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() clientDto: ClientDto) {
    return this.clientService.update(+id, clientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }
}
