import { Injectable } from '@nestjs/common';

/**
 * La mayoría de las clases en Nest serán providers, esto incluye services,
 * factories, helpers. La principal idea de un provider es que pueda ser
 * inyectado vía inyección de dependencias en ese módulo o en otros.
 *
 * Se colocan en la propiedad providers de @Module y son instanciados
 * automáticamente debido a que tienen @Injectable.
 *
 * Un Provider se puede hacer disponible a otros módulos en la
 * propiedad exports de @Module
 *
 * Los Servicios son responsables de Almacenar y Obtener datos de
 * tu base de datos.
 *
 * Utilizando TypeORM un Servicio se conecta a tu base de datos por
 * medio de un Repositorio que tendrá todos los métodos del ORM.
 *
 * Para crear un nuevo Provider usando Nest CLI:
 * Comando completo: nest generate provider nombre_provider
 * Comando abreviado: nest g pr nombre_provider
 */

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getPost(): string {
    return 'Hola Desde @Post del Service';
  }

  getPut(): string {
    return 'Hola Desde @Put del Service';
  }

  getPatch(): string {
    return 'Hola Desde @Patch del Service';
  }
}
