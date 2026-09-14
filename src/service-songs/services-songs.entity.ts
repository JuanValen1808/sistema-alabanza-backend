// src/service-songs/services-songs.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
// Ya ni siquiera necesitas importar WorshipService ni Song arriba si usas strings, 
// pero si los necesitas para tipar, puedes importarlos type-only:
import type { WorshipService } from '../worship-services/worship-services.entity.js';
import type { Song } from '../songs/songs.entity.js';

@Entity('service_songs')
export class ServiceSong {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'service_id' })
  serviceId: number;

  @Column({ name: 'song_id' })
  songId: number;

  @Column({ name: 'sequence_order' })
  sequenceOutput: number;

  // 👇 Usamos el nombre de la entidad como string ('WorshipService')
  @ManyToOne('WorshipService', (service: WorshipService) => service.serviceSongs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'service_id' })
  service: WorshipService;

  // 👇 Usamos el nombre de la entidad como string ('Song')
  @ManyToOne('Song', (song: Song) => song.serviceSongs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'song_id' })
  song: Song;
}