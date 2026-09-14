import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

async register(dto: { name?: string; email: string; password: string; confirmPassword: string; role?: string }) {
    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestException('Las contraseñas no coinciden');
    }

    const existingUser = await this.userRepository.findOne({ where: { email: dto.email } });
    if (existingUser) {
      throw new BadRequestException('El correo ya está registrado');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    // Si mandan 'admin' asignamos rol 1, de lo contrario rol 2 (por ejemplo)
    const assignedRoleId = dto.role === 'admin' ? 1 : 2;

    const newUser = this.userRepository.create({
      name: dto.name || dto.email.split('@')[0],
      email: dto.email,
      passwordHash: passwordHash,
      roleId: assignedRoleId, 
    });

    await this.userRepository.save(newUser);
    return { message: 'Usuario registrado exitosamente' };
  }

  async login(dto: { email: string; password: string }) {
    const user = await this.userRepository.findOne({ 
      where: { email: dto.email },
      relations: { role: true } 
    });

    if (!user || !(await bcrypt.compare(dto.password, user.passwordHash))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return {
      message: 'Inicio de sesión exitoso',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role?.name, // 'admin' o 'musician'
        roleId: user.roleId
      },
      token: 'fake-jwt-token' // O tu token real con @nestjs/jwt si lo implementas
    };
  }
}