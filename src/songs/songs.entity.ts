import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ServiceSong } from '../service-songs/services-songs.entity.js';

@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  title: string;

  @Column({ length: 100, nullable: true })
  composer: string;

  @Column({ name: 'musical_key', length: 10, nullable: true })
  musicalKey: string;

  @Column({ length: 30, nullable: true })
  tempo: string;

  @Column({ type: 'text', nullable: true })
  lyrics: string;

  @Column({ type: 'text', nullable: true })
  chords: string;

  @Column({ name: 'youtube_link', length: 255, nullable: true })
  youtubeLink: string;

  @Column({ name: 'drive_track_link', length: 255, nullable: true })
  driveTrackLink: string;

  @Column({ name: 'is_new', default: true })
  isNew: boolean;

  @Column({ name: 'last_played_date', type: 'date', nullable: true })
  lastPlayedDate: Date;

  @OneToMany(() => ServiceSong, (serviceSong) => serviceSong.song)
  serviceSongs: ServiceSong[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}