/**
 * Módulo principal de la aplicación NestJS
 *
 * Los módulos son fundamentales en NestJS ya que:
 * - Toda aplicación tiene al menos un módulo (el módulo raíz)
 * - Se usan para organizar y encapsular componentes relacionados
 * - Permiten gestionar dependencias entre diferentes partes de la app
 * - Ayudan a mantener una estructura modular y escalable
 * - Se pueden importar otros módulos para extender funcionalidades
 *
 * Para crear un nuevo módulo usando Nest CLI:
 * Comando completo: nest generate module nombre_modulo
 * Comando abreviado: nest g mo nombre_modulo
 */

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { typeOrmConfig } from './config/typeorm.config';
import { ProductsModule } from './products/products.module';
import { TransactionsModule } from './transactions/transactions.module';
import { CouponsModule } from './coupons/coupons.module';
import { SeederModule } from './seeder/seeder.module';
import { UploadImageModule } from './upload-image/upload-image.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // Configuración de variables de entorno
      isGlobal: true, // Hace que las variables de entorno sean globales
    }),
    TypeOrmModule.forRootAsync({
      useFactory: typeOrmConfig,
      inject: [ConfigService],
    }),
    CategoriesModule,
    ProductsModule,
    TransactionsModule,
    CouponsModule,
    UploadImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
