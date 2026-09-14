import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import type { User } from '../users/users.entity.js';
import type { ServiceSong } from '../service-songs/services-songs.entity.js';
import type { ServiceType } from '../service-types/service-types.entity.js';

@Entity('worship_services')
export class WorshipService {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  title: string;

  @Column({ name: 'service_date', type: 'date' })
  serviceDate: Date;

  @Column({ name: 'service_type_id' })
  serviceTypeId: number;

  // Relación ManyToOne con la nueva tabla ServiceType
  @ManyToOne('ServiceType', (serviceType: ServiceType) => serviceType.worshipServices, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'service_type_id' })
  serviceType: ServiceType;

  @Column({ name: 'created_by', nullable: true })
  createdBy: number;

  @ManyToOne('User', (user: User) => user.createdServices, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'created_by' })
  creator: User;

  @OneToMany('ServiceSong', (serviceSong: ServiceSong) => serviceSong.service, { cascade: true })
  serviceSongs: ServiceSong[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}