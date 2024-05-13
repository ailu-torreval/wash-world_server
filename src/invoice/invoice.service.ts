import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InvoiceDto } from '@invoice/dto/invoice.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from '@invoice/entities/invoice.entity';
import { Repository } from 'typeorm';
import { Extra } from '@extra/entities/extra.entity';
import { ClientService } from '@client/client.service';
import { VenueService } from '@venue/venue.service';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
    @InjectRepository(Extra)
    private extraRepository: Repository<Extra>,
    private clientService: ClientService,
    private venueService: VenueService,
  ) {}

  async create(invoiceDto: InvoiceDto): Promise<Invoice> {
    try {
      const client =
        await this.clientService.checkClientBalanceAndUpdate(invoiceDto);
      const venue = await this.venueService.findOne(invoiceDto.venue_id);
      const extras = await this.extraRepository.find({
        where: invoiceDto.extras_ids.map((id) => ({ id })),
      });

      const invoice = this.invoiceRepository.create({
        client,
        venue,
        extras,
        date: new Date(),
        total_amount: invoiceDto.total_amount,
        points_earned: invoiceDto.points_earned,
        points_redeemed: invoiceDto.points_redeemed,
      });

      return await this.invoiceRepository.save(invoice);
    } catch (error) {
      throw new InternalServerErrorException(
        `Error creating invoice, ${error}`,
      );
    }
  }

  async findAll(): Promise<Invoice[]> {
    try {
      const invoices = await this.invoiceRepository.find({
        relations: ['client', 'venue', 'extras'],
      });
      return invoices;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error fetching invoices, ${error}`,
      );
    }
  }

  async findOne(id: number): Promise<Invoice> {
    const selectedInvoice = await this.invoiceRepository.findOne({
      where: { id },
      relations: ['client', 'venue', 'extras'],
    });
    if (selectedInvoice) {
      return selectedInvoice;
    } else {
      throw new NotFoundException(`Invoice with id ${id} not found`);
    }
  }

  async update(id: number, invoiceDto: InvoiceDto): Promise<Invoice> {
    try {
      const client = await this.clientService.findOne(invoiceDto.client_id);
      const venue = await this.venueService.findOne(invoiceDto.venue_id);
      const extras = await this.extraRepository.find({
        where: invoiceDto.extras_ids.map((id) => ({ id })),
      });

      const { password, ...cleanClient } = client;

      const updatedInvoice = await this.invoiceRepository.update(id, {
        client: cleanClient,
        venue,
        extras,
        total_amount: invoiceDto.total_amount,
        points_earned: invoiceDto.points_earned,
        points_redeemed: invoiceDto.points_redeemed,
      });

      if (updatedInvoice.affected === 1) {
        return this.invoiceRepository.findOne({
          where: { id },
          relations: ['client', 'venue', 'extras'],
        });
      }
    } catch (error) {
      throw new InternalServerErrorException(
        `Error updating invoice, ${error}`,
      );
    }
  }

  async remove(id: number): Promise<any> {
    const deletedInvoice = await this.invoiceRepository.delete(id);
    if (deletedInvoice.affected === 1) {
      return { id: id, status: 'deleted' };
    } else {
      throw new NotFoundException(`Invoice with id ${id} not found`);
    }
  }
}
