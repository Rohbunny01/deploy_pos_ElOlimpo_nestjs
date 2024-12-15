import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../config/typeorm.config';
import { SeederService } from './seeder.service';
import { Category } from '../categories/entities/category.entity';
import { Product } from '../products/entities/product.entity';

/**
 * Módulo encargado de la configuración y gestión del sembrado de datos
 * Este módulo proporciona la funcionalidad necesaria para poblar la base de datos
 * con datos iniciales de categorías y productos
 */
@Module({
  imports: [
    // Configuración del módulo de variables de entorno
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables de entorno sean accesibles en toda la aplicación
    }),

    // Configuración asíncrona de TypeORM para la conexión a la base de datos
    TypeOrmModule.forRootAsync({
      useFactory: typeOrmConfig, // Utiliza la configuración definida en typeorm.config
      inject: [ConfigService], // Inyecta el servicio de configuración
    }),

    // Registro de las entidades que serán utilizadas en el sembrado
    TypeOrmModule.forFeature([
      Product, // Entidad de productos
      Category, // Entidad de categorías
    ]),
  ],
  providers: [
    SeederService, // Servicio que implementa la lógica de sembrado
  ],
})
export class SeederModule {}
