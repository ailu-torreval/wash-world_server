import { Test, TestingModule } from '@nestjs/testing';
import { WashTypeService } from './wash_type.service';

describe('WashTypeService', () => {
  let service: WashTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WashTypeService],
    }).compile();

    service = module.get<WashTypeService>(WashTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
