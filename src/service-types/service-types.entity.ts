import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import type { WorshipService } from '../worship-services/worship-services.entity.js';

@Entity('service_types')
export class ServiceType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @OneToMany('WorshipService', (service: WorshipService) => service.serviceType)
  worshipServices: WorshipService[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}