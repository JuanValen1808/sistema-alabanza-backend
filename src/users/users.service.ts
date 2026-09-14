import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: { role: true } });
  }

  async remove(id: number): Promise<void> {
  await this.userRepository.delete(id);
}

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { role: true },
    });
    if (!user) throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    return user;
  }

  create(userData: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(userData);
    return this.userRepository.save(newUser);
  }

async updateProfile(userId: number, updateData: { name?: string; email?: string; password?: string }): Promise<User> {
  const user = await this.findOne(userId);

  if (updateData.name) user.name = updateData.name;
  if (updateData.email) user.email = updateData.email;
  
  if (updateData.password && updateData.password.trim() !== '') {
    user.passwordHash = await bcrypt.hash(updateData.password, 10);
  }

  return this.userRepository.save(user);
}

}