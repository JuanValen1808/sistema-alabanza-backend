import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Repository } from 'typeorm';
import { WorshipService } from './worship-services.entity.js';

@Injectable()
export class WorshipServicesService {
  private readonly logger = new Logger(WorshipServicesService.name);

  constructor(
    @InjectRepository(WorshipService)
    private readonly serviceRepository: Repository<WorshipService>,
  ) {}

findAll(): Promise<WorshipService[]> {
  return this.serviceRepository.find({
    relations: {
      serviceType: true,
      serviceSongs: { song: true },
    },
    order: { serviceDate: 'ASC' },
  });
}

async findNearest(): Promise<WorshipService | null> {
  const today = new Date().toISOString().split('T')[0];
  
  // Usamos QueryBuilder o find para encontrar el primero de hoy en adelante
  const services = await this.serviceRepository.find({
    relations: {
      serviceType: true,
      serviceSongs: { song: true },
    },
    where: {} , // Puedes ajustar la condición según la versión de TypeORM
    order: { serviceDate: 'ASC' },
  });

  // Filtramos en memoria o por consulta el que sea mayor o igual a hoy
  const nearest = services.find(s => String(s.serviceDate) >= today);
  return nearest || services[0] || null; // Devuelve el más cercano o el primero disponible
}

  create(data: Partial<WorshipService>): Promise<WorshipService> {
    const service = this.serviceRepository.create(data);
    return this.serviceRepository.save(service);
  }

  async update(id: number, data: Partial<WorshipService>): Promise<WorshipService> {
    // 1. Buscamos el culto existente incluyendo sus relaciones actuales
    const service = await this.serviceRepository.findOne({
      where: { id },
      relations: { serviceSongs: true },
    });

    if (!service) {
      throw new Error(`Culto con ID ${id} no encontrado`);
    }

    // 2. Si vienen canciones nuevas en la petición (serviceSongs), 
    // podemos actualizar las propiedades básicas y gestionar la relación.
    // TypeORM con 'cascade: true' se encarga de guardar los cambios en las canciones asociadas.
    
    Object.assign(service, data);

    return this.serviceRepository.save(service);
  }

  // Crear un culto manual
  async createUno(data: Partial<WorshipService>): Promise<WorshipService> {
    const service = this.serviceRepository.create(data);
    return this.serviceRepository.save(service);
  }

  // Borrar un culto por ID
  async remove(id: number): Promise<void> {
    await this.serviceRepository.delete(id);
  }

  // Se ejecuta automáticamente el primer día de cada mes a las 00:00 AM
  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT, { timeZone: 'America/Santiago' })
  async generateMonthlyServices() {
    this.logger.log('Generando cultos automáticos para el mes actual...');
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // 0-indexado

    // Obtener el último día del mes actual
    const lastDay = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= lastDay; day++) {
      const date = new Date(year, month, day);
      const dayOfWeek = date.getDay(); // 4 = Jueves, 0 = Domingo

      let serviceTypeId = 0;
      let title = '';

      if (dayOfWeek === 4) {
        serviceTypeId = 2; // ID del Culto de Adoración (Jueves) en la tabla service_types
        title = 'Culto de Adoración - Jueves';
      } else if (dayOfWeek === 0) {
        serviceTypeId = 1; // ID del Culto Dominical en la tabla service_types
        title = 'Culto General - Domingo';
      }

      if (serviceTypeId) {
        // 1. Verificamos usando serviceTypeId en lugar de serviceType
        const existing = await this.serviceRepository.findOne({
          where: { serviceDate: date as any, serviceTypeId },
        });

        if (!existing) {
          // 2. Guardamos asignando serviceTypeId directamente
          await this.serviceRepository.save({
            title,
            serviceDate: date,
            serviceTypeId,
          });
          this.logger.log(`Culto creado: ${title} el ${date.toISOString().split('T')[0]}`);
        }
      }
    }
  }

  
}