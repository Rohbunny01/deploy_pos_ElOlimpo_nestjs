/**
 * Controlador principal de la aplicación NestJS
 *
 * Los controladores en NestJS tienen un papel fundamental:
 * - Manejan las peticiones HTTP directamente (a diferencia del MVC tradicional con Express)
 * - No existe un Router separado como en Express
 * - Son responsables de:
 *   1. Recibir las peticiones HTTP
 *   2. Procesar la lógica de ruteo
 *   3. Entregar las respuestas correspondientes
 *
 * Los controladores se registran en el decorador @Module()
 * en la propiedad 'controllers'
 *
 * El decorador @Controller() se utiliza a nivel de clase y puede recibir como
 * parámetro un string que define el prefijo de ruta base para todas las
 * peticiones HTTP manejadas por este controlador.
 * Ejemplo:
 * @Controller('api/users') -> todas las rutas comenzarán con /api/users
 *
 * Decoradores en Controllers:
 * -------------------------
 * 1. Decorador de Clase:
 *    - @Controller(): Se utiliza a nivel de clase para definir la ruta base
 *    - Recibe como parámetro la URL para las peticiones HTTP
 *
 * 2. Decoradores de Método:
 *    Los controladores utilizan diferentes decoradores para manejar los métodos HTTP:
 *    - @Get()
 *    - @Post()
 *    - @Put()
 *    - @Delete()
 */

import { Controller, Get, Post, Put, Patch } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  getPost() {
    return this.appService.getPost();
  }

  @Put()
  getPut() {
    return this.appService.getPut();
  }

  @Patch()
  getPatch() {
    return this.appService.getPatch();
  }
}
