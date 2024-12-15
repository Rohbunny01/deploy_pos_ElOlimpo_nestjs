# NestJS

## Inyección de Dependencias

La inyección de dependencias es un concepto fundamental en NestJS:

- Es un patrón de diseño que permite gestionar las dependencias de un objeto de manera externa, en lugar de que el propio objeto las cree
- Conforme vas añadiendo archivos a tu aplicación, NestJS se encarga de registrarlas en el lugar adecuado mediante este sistema
- Facilita la gestión y organización de dependencias en toda la aplicación

## Providers en NestJS

Los providers son componentes fundamentales en NestJS:

- La mayoría de las clases son providers (services, factories, helpers)
- Su principal propósito es poder ser inyectados vía inyección de dependencias
- Se declaran en la propiedad `providers` del decorador `@Module`
- Se instancian automáticamente gracias al decorador `@Injectable`
- Pueden exportarse a otros módulos mediante la propiedad `exports` de `@Module`

## Servicios

Los servicios son un tipo especial de provider que:

- Son responsables de almacenar y obtener datos de la base de datos
- Con TypeORM, se conectan a la base de datos mediante Repositorios que contienen los métodos del ORM

### Crear un nuevo Provider

Comando completo
nest generate provider nombre_provider
Comando abreviado
nest g pr nombre_provider

## Módulos en NestJS

Características principales:

- Son el componente fundamental de toda aplicación NestJS
- Toda aplicación tiene al menos un módulo raíz
- Organizan y encapsulan componentes relacionados
- Gestionan dependencias entre diferentes partes de la app
- Mantienen una estructura modular y escalable
- Permiten importar otros módulos para extender funcionalidades

### Crear un nuevo Módulo

Comando completo
nest generate module nombre_modulo
Comando abreviado
nest g mo nombre_modulo

## Controladores en NestJS

Los controladores tienen las siguientes responsabilidades:

- Manejan peticiones HTTP directamente
- No requieren un Router separado como en Express
- Se encargan de:
  1. Recibir peticiones HTTP
  2. Procesar la lógica de ruteo
  3. Entregar respuestas

## Configuración

- Se registran en el decorador `@Module()` en la propiedad `controllers`
- Utilizan el decorador `@Controller()` a nivel de clase
- Pueden recibir un prefijo de ruta base como parámetro
  - Ejemplo: `@Controller('api/users')` -> todas las rutas comenzarán con `/api/users`

## Decoradores en NestJS

Los decoradores son una característica fundamental en NestJS que permiten añadir metadatos y funcionalidad a nuestro código. Se clasifican en:

## Tipos de Decoradores

### Decoradores de Clase

- `@Module`: Define un módulo en NestJS
- `@Controller`: Define una clase como controlador
- `@Injectable`: Marca una clase como disponible para inyección de dependencias

### Decoradores de Método

- `@Get()`
- `@Post()`
- `@Put()`
- `@Delete()`

### Decoradores de Parámetro

- `@Param`: Accede a los parámetros de la ruta
- `@Query`: Accede a los query parameters
- `@Body`: Accede al cuerpo de la petición

### Decoradores de Propiedad

- `@Injectable`: Marca una clase como servicio inyectable
- `@InjectRepository`: Inyecta un repositorio de TypeORM

### Decoradores Comunes de NestJS

Los decoradores más utilizados se pueden clasificar en cuatro categorías principales:

1. **Decoradores de Clase como @Module y @Controller**

   - Definen el rol fundamental de una clase en la aplicación
   - @Module para definir módulos
   - @Controller para definir controladores

2. **Decoradores de Método como @Get, @Post, @Put, @Delete**

   - Se utilizan para definir endpoints HTTP
   - Especifican el tipo de solicitud que manejará cada método

3. **Decoradores de Parámetro como @Param, @Query y @Body**

   - Permiten acceder a diferentes partes de la solicitud HTTP
   - Facilitan la extracción de datos de las peticiones

4. **Decoradores de Propiedad como @Injectable o @InjectRepository**
   - Manejan la inyección de dependencias
   - Permiten la integración con servicios y repositorios

## PIPES

### Que son?

Los pipes en nest son compnentes que permiten transformar y validar datos en als solicitudes entrantes
Funcionan como intermediarios que procesan los datos antes de que lleguen al controlador, asegurando
que esten en el formato adecuado y que cumplas las reglas de validacion establecidas

Tenemos tipos
Transformacuion: Pueden transformar el valor de entrada, ej de string a number
Validacion: Verificar si el valor de entrada es el valido, ej comprobar que el parametro sea un entero
o si un campo es obligatorio

@Get(':id')
findOne(@Param('id', ParseIntPipe) id: string) {
return this.categoriesService.findOne(+id);
}

Por ejemplo en el ParseIntPipe se esta aplicando una valdiacion para que el string entregado en
la url sea solo de tipo numerico.

## Propiedades

Las transaciones tienen 4 propiedades que se identifican por el acronimo ACID

1. Atomicity
2. Consistency
3. Isolation
4. Durability

## date-fns

date-fns es una librería moderna de JavaScript para manipular fechas.

### Características principales:

- Funciones modulares e independientes
- Inmutabilidad
- Soporte para TypeScript
- Manejo de zonas horarias
- Funciones de formato y parseo
- Cálculos con fechas

### Funciones comunes:

- format(): Da formato a fechas
- parse(): Convierte strings a objetos Date
- add/sub: Suma o resta tiempo
- compare: Compara fechas
- isValid: Valida fechas

Documentación: https://date-fns.org
