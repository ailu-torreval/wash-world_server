import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ExtraService } from './extra.service';
import { ExtraDto } from './dto/extra.dto';

@Controller('extra')
export class ExtraController {
  constructor(private readonly extraService: ExtraService) {}

  @Post()
  create(@Body() extraDto: ExtraDto) {
    return this.extraService.create(extraDto);
  }

  @Get()
  findAll() {
    return this.extraService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.extraService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() extraDto: ExtraDto) {
    return this.extraService.update(+id, extraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.extraService.remove(+id);
  }
}
