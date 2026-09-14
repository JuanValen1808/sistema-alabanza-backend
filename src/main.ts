// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Configuración de CORS segura para producción
  app.enableCors({
    origin: [
      'http://localhost:5173', // Tu frontend local de desarrollo
      'https://sistema-alabanza-frontend.vercel.app/' // Aquí pondrás la URL de Vercel cuando lo subas
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // 2. Puerto dinámico para la nube (con respaldo al 3000 para local)
  const port = process.env.PORT || 3000;
  
  // 3. Escuchar en '0.0.0.0' es necesario en la gran mayoría de plataformas cloud
  await app.listen(port, '0.0.0.0');
  
  console.log(`Backend corriendo en el puerto: ${port}`);
}
bootstrap();