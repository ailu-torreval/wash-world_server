import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientDto } from './dto/client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() clientDto: ClientDto) {
    return this.clientService.update(+id, clientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }
}