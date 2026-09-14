import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { SongsService } from './songs.service.js';
import { Song } from './songs.entity.js';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get()
  findAll() {
    return this.songsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.songsService.findOne(+id);
  }

  @Post()
  create(@Body() songData: Partial<Song>) {
    return this.songsService.create(songData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() songData: Partial<Song>) {
    return this.songsService.update(+id, songData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.songsService.remove(+id);
  }
}