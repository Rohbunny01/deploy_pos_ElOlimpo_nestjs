/* Aca configuramos la conexión a la base de datos  para hacer la conexion desde
el app.module */

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

export const typeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get('DATABASE_HOST'),
  port: configService.get('DATABASE_PORT'),
  username: configService.get('DATABASE_USER'),
  password: configService.get('DATABASE_PASS'),
  database: configService.get('DATABASE_NAME'),
  ssl: true,
  logging: false,
  entities: [join(__dirname + '../../**/*.entity.{js,ts}')],
  synchronize: true, // Solo para desarrollo
});

console.log('Conexion a la base de datos establecida');
