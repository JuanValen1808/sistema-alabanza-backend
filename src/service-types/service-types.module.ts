// src/service-types/service-types.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceType } from './service-types.entity.js';
import { ServiceTypesService } from './service-types.service.js';
import { ServiceTypesController } from './service-types.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceType])],
  controllers: [ServiceTypesController],
  providers: [ServiceTypesService],
  exports: [ServiceTypesService, TypeOrmModule],
})
export class ServiceTypesModule {}