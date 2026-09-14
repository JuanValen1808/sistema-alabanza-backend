import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { ServiceTypesService } from './service-types.service.js';
import type { ServiceType } from './service-types.entity.js';

@Controller('service-types')
export class ServiceTypesController {
  constructor(private readonly serviceTypesService: ServiceTypesService) {}

  @Get()
  findAll(): Promise<ServiceType[]> {
    return this.serviceTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ServiceType> {
    return this.serviceTypesService.findOne(+id);
  }

  @Post()
  create(@Body() body: { name: string }): Promise<ServiceType> {
    return this.serviceTypesService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: { name: string }): Promise<ServiceType> {
    return this.serviceTypesService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.serviceTypesService.remove(+id);
  }
}