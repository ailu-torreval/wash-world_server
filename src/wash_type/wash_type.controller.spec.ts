import { Test, TestingModule } from '@nestjs/testing';
import { WashTypeController } from './wash_type.controller';
import { WashTypeService } from './wash_type.service';

describe('WashTypeController', () => {
  let controller: WashTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WashTypeController],
      providers: [WashTypeService],
    }).compile();

    controller = module.get<WashTypeController>(WashTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
