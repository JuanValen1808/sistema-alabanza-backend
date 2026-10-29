// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
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
    ScheduleModule.forRoot(),
    // Si existe DATABASE_URL (Coolify) se usa; si no, las variables DB_* (local)
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'sistema_alabanza',
      autoLoadEntities: true,
      synchronize: false,
    }),
    SongsModule,
    UsersModule,
    RolesModule,
    ServiceSongsModule,
    WorshipServicesModule,
    ServiceTypesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}