import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { WorshipServicesService } from './worship-services.service.js';
import { WorshipService } from './worship-services.entity.js';

@Controller('worship-services')
export class WorshipServicesController {
  constructor(private readonly worshipServicesService: WorshipServicesService) {}

  @Get()
  findAll() {
    return this.worshipServicesService.findAll();
  }

  @Post()
  create(@Body() data: Partial<WorshipService>) {
    return this.worshipServicesService.create(data);
  }

  // Endpoint manual por si quieren forzar la generación de cultos del mes de golpe
  @Post('generate-automatic')
  triggerAutomaticGeneration() {
    return this.worshipServicesService.generateMonthlyServices();
  }

  @Put(':id')
update(@Param('id') id: string, @Body() updateDto: any) {
  return this.worshipServicesService.update(+id, updateDto);
}
@Post()
  createUno(@Body() createDto: any) {
    return this.worshipServicesService.createUno(createDto);
  }

@Delete(':id')
remove(@Param('id') id: string): Promise<void> {
  return this.worshipServicesService.remove(+id);
}

@Get('nearest')
findNearest() {
  return this.worshipServicesService.findNearest();
}
}