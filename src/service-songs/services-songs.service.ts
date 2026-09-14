import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceSong } from './services-songs.entity.js';

@Injectable()
export class ServiceSongsService {
  constructor(
    @InjectRepository(ServiceSong)
    private readonly serviceSongRepository: Repository<ServiceSong>,
  ) {}

  findByService(serviceId: number): Promise<ServiceSong[]> {
    return this.serviceSongRepository.find({
      where: { serviceId },
      relations: { song: true },
      order: { sequenceOutput: 'ASC' },
    });
  }

  async addSongToService(serviceId: number, songId: number, sequenceOrder: number): Promise<ServiceSong> {
    const relation = this.serviceSongRepository.create({ serviceId, songId, sequenceOutput: sequenceOrder });
    return this.serviceSongRepository.save(relation);
  }

  async remove(id: number): Promise<void> {
    await this.serviceSongRepository.delete(id);
  }
}