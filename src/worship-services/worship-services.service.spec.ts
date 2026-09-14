import { Test, TestingModule } from '@nestjs/testing';
import { WorshipServicesService } from './worship-services.service.js';

describe('WorshipServicesService', () => {
  let service: WorshipServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorshipServicesService],
    }).compile();

    service = module.get<WorshipServicesService>(WorshipServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
