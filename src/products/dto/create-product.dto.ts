import { IsString, IsNotEmpty, IsNumber, IsInt } from 'class-validator';

/**
 * DTO para la creación de nuevos productos
 * Define la estructura y validaciones necesarias para crear un producto
 */
export class CreateProductDto {
  /**
   * Nombre del producto
   * @example "Laptop HP"
   * Debe ser una cadena de texto y es obligatorio
   */
  @IsString({ message: 'El nombre del producto debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre del producto es requerido' })
  name: string;

  @IsNotEmpty({ message: 'El nombre del producto es requerido' })
  image: string;

  /**
   * Precio del producto
   * @example 999.99
   * Debe ser un número con máximo 2 decimales y es obligatorio
   */
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El precio del producto debe ser un número' },
  )
  @IsNotEmpty({ message: 'El precio del producto es requerido' })
  price: number;

  /**
   * Cantidad disponible en inventario
   * @example 100
   * Debe ser un número entero (sin decimales) y es obligatorio
   */
  @IsNumber(
    { maxDecimalPlaces: 0 },
    { message: 'La cantidad disponible en inventario debe ser un número' },
  )
  @IsNotEmpty({ message: 'La cantidad disponible en inventario es requerida' })
  inventory: number;

  /**
   * ID de la categoría a la que pertenece el producto
   * @example 1
   * Debe ser un número entero y es obligatorio
   */
  @IsInt({ message: 'La categoría del producto debe ser un número entero' })
  @IsNotEmpty({ message: 'La categoría del producto es requerida' })
  categoryId: number;
}
