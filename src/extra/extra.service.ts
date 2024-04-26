import { Injectable } from '@nestjs/common';
import { ExtraDto } from './dto/extra.dto';

@Injectable()
export class ExtraService {
  create(extraDto: ExtraDto) {
    return 'This action adds a new extra';
  }

  findAll() {
    return `This action returns all extra`;
  }

  findOne(id: number) {
    return `This action returns a #${id} extra`;
  }

  update(id: number, extraDto: ExtraDto) {
    return `This action updates a #${id} extra`;
  }

  remove(id: number) {
    return `This action removes a #${id} extra`;
  }
}
