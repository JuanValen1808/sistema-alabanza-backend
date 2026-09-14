import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Song } from './songs.entity.js';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>,
  ) {}

  findAll(): Promise<Song[]> {
    return this.songRepository.find({ order: { title: 'ASC' } });
  }

  async findOne(id: number): Promise<Song> {
    const song = await this.songRepository.findOneBy({ id });
    if (!song) throw new NotFoundException(`Alabanza con ID ${id} no encontrada`);
    return song;
  }

  create(songData: Partial<Song>): Promise<Song> {
    const newSong = this.songRepository.create(songData);
    return this.songRepository.save(newSong);
  }

  async update(id: number, songData: Partial<Song>): Promise<Song> {
    await this.songRepository.update(id, songData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.songRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Alabanza con ID ${id} no encontrada`);
  }
}