import { Test, TestingModule } from '@nestjs/testing';
import { WorshipServicesController } from './worship-services.controller.js';

describe('WorshipServicesController', () => {
  let controller: WorshipServicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorshipServicesController],
    }).compile();

    controller = module.get<WorshipServicesController>(WorshipServicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
