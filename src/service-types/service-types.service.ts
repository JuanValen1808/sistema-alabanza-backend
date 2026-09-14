import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceType } from './service-types.entity.js';

@Injectable()
export class ServiceTypesService {
  constructor(
    @InjectRepository(ServiceType)
    private readonly serviceTypeRepository: Repository<ServiceType>,
  ) {}

  findAll(): Promise<ServiceType[]> {
    return this.serviceTypeRepository.find();
  }

  async findOne(id: number): Promise<ServiceType> {
    const serviceType = await this.serviceTypeRepository.findOne({ where: { id } });
    if (!serviceType) throw new NotFoundException(`Tipo de culto con ID ${id} no encontrado`);
    return serviceType;
  }

  create(data: Partial<ServiceType>): Promise<ServiceType> {
    const serviceType = this.serviceTypeRepository.create(data);
    return this.serviceTypeRepository.save(serviceType);
  }

  async update(id: number, data: Partial<ServiceType>): Promise<ServiceType> {
    await this.serviceTypeRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.serviceTypeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Tipo de culto con ID ${id} no encontrado`);
    }
  }
}