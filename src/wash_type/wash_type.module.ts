import { Module } from '@nestjs/common';
import { WashTypeService } from './wash_type.service';
import { WashTypeController } from './wash_type.controller';
import { WashType } from './entities/wash_type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([WashType])],
  controllers: [WashTypeController],
  providers: [WashTypeService],
})
export class WashTypeModule {}
