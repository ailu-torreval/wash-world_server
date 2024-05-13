import { Module } from '@nestjs/common';
import { ExtraService } from '@extra/extra.service';
import { ExtraController } from '@extra/extra.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Extra } from '@extra/entities/extra.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Extra])],  
  controllers: [ExtraController],
  providers: [ExtraService],
  exports: [ExtraService],
})
export class ExtraModule {}
