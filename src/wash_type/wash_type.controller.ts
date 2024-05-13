import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { WashTypeService } from './wash_type.service';
import { WashTypeDto } from './dto/wash_type.dto';

@Controller('wash-type')
export class WashTypeController {
  constructor(private readonly washTypeService: WashTypeService) {}

  @Post()
  create(@Body() washTypeDto: WashTypeDto) {
    return this.washTypeService.create(washTypeDto);
  }

  @Get()
  findAll() {
    return this.washTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.washTypeService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() washTypeDto: WashTypeDto,
  ) {
    return this.washTypeService.update(+id, washTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.washTypeService.remove(+id);
  }
}
