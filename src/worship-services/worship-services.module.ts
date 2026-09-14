import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorshipService } from './worship-services.entity.js';
import { WorshipServicesService } from './worship-services.service.js';
import { WorshipServicesController } from './worship-services.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([WorshipService])],
  providers: [WorshipServicesService],
  controllers: [WorshipServicesController],
  exports: [WorshipServicesService],
})
export class WorshipServicesModule {}