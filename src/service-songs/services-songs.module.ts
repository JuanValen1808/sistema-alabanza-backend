import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceSong } from './services-songs.entity.js';
import { ServiceSongsService } from './services-songs.service.js';
import { ServiceSongsController } from './services-songs-controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceSong])],
  providers: [ServiceSongsService],
  controllers: [ServiceSongsController],
  exports: [ServiceSongsService],
})
export class ServiceSongsModule {}