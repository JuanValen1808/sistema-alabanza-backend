// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongsModule } from './songs/songs.module.js';
import { UsersModule } from './users/users.module.js';
import { RolesModule } from './roles/roles.module.js';
import { ServiceSongsModule } from './service-songs/services-songs.module.js';
import { WorshipServicesModule } from './worship-services/worship-services.module.js';
import { ServiceTypesModule } from './service-types/service-types.module.js';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'sistema_alabanza',
      autoLoadEntities: true,
      synchronize: false,
    }),
    // ¡Faltaban registrarse aquí! 👇
    SongsModule,
    UsersModule,
    RolesModule,
    ServiceSongsModule,
    WorshipServicesModule,
    ServiceTypesModule,
    AuthModule,
  ],
})
export class AppModule {}