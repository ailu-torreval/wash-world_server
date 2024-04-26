import { Injectable } from '@nestjs/common';
import { WashTypeDto } from './dto/wash_type.dto';

@Injectable()
export class WashTypeService {
  create(washTypeDto: WashTypeDto) {
    return 'This action adds a new washType';
  }

  findAll() {
    return `This action returns all washType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} washType`;
  }

  update(id: number, washTypeDto: WashTypeDto) {
    return `This action updates a #${id} washType`;
  }

  remove(id: number) {
    return `This action removes a #${id} washType`;
  }
}
