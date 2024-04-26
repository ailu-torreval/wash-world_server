import { Injectable } from '@nestjs/common';
import { InvoiceDto } from './dto/invoice.dto';

@Injectable()
export class InvoiceService {
  create(invoiceDto: InvoiceDto) {
    return 'This action adds a new invoice';
  }

  findAll() {
    return `This action returns all invoice`;
  }

  findOne(id: number) {
    return `This action returns a #${id} invoice`;
  }

  update(id: number, invoiceDto: InvoiceDto) {
    return `This action updates a #${id} invoice`;
  }

  remove(id: number) {
    return `This action removes a #${id} invoice`;
  }
}
