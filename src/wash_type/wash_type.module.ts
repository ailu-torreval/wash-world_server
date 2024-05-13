import { Module } from '@nestjs/common';
import { WashTypeService } from '@wash_type/wash_type.service';
import { WashTypeController } from '@wash_type/wash_type.controller';
import { WashType } from '@wash_type/entities/wash_type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([WashType])],
  controllers: [WashTypeController],
  providers: [WashTypeService],
})
export class WashTypeModule {}
