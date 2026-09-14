import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ServiceSongsService } from './services-songs.service.js';

@Controller('service-songs')
export class ServiceSongsController {
  constructor(private readonly serviceSongsService: ServiceSongsService) {}

  @Get('service/:serviceId')
  findByService(@Param('serviceId') serviceId: string) {
    return this.serviceSongsService.findByService(+serviceId);
  }

  @Post()
  addSong(@Body() body: { serviceId: number; songId: number; sequenceOrder: number }) {
    return this.serviceSongsService.addSongToService(body.serviceId, body.songId, body.sequenceOrder);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceSongsService.remove(+id);
  }
}