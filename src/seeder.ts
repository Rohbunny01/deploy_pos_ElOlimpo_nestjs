import { NestFactory } from '@nestjs/core';

import { SeederModule } from './seeder/seeder.module';
import { SeederService } from './seeder/seeder.service';

/**
 * Script principal para la inicialización de datos en la base de datos
 *
 * Este script realiza las siguientes operaciones:
 * 1. Crea un contexto de aplicación NestJS usando el SeederModule
 * 2. Obtiene una instancia del SeederService
 * 3. Ejecuta el proceso de sembrado de datos
 * 4. Cierra la conexión de la aplicación
 *
 * @returns {Promise<void>}
 */

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeederModule);
  const seeder = app.get(SeederService);
  await seeder.seed();
  await app.close();
}

bootstrap();
