// Importaciones necesarias para la validación para los errores y transformación de datos

import { Transform, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

/**
 * DTO que representa el contenido individual de una transacción
 * Cada elemento contiene información sobre un producto específico en la transacción
 */
export class TransactionContentsDto {
  /**
   * ID único del producto
   * Debe ser un número entero y no puede estar vacío
   */
  @IsNotEmpty({ message: 'El ID del producto no puede estar vacío' })
  @IsInt({ message: 'Producto no válido' })
  productId: number;

  /**
   * Cantidad del producto en la transacción
   * Debe ser un número entero positivo y no puede estar vacío
   */
  @IsNotEmpty({ message: 'Cantidad no puede estar vacía' })
  @IsInt({ message: 'Cantidad no válida' })
  quantity: number;

  /**
   * Precio unitario del producto
   * Debe ser un número válido y no puede estar vacío
   */
  @IsNotEmpty({ message: 'Precio no puede estar vacío' })
  @IsNumber({}, { message: 'Precio no válido' })
  price: number;
}

/**
 * DTO principal para la creación de una nueva transacción
 * Contiene el total de la transacción y un array de productos
 */
export class CreateTransactionDto {
  /**
   * Monto total de la transacción
   * Debe ser un número válido y no puede estar vacío
   */
  @IsNotEmpty({ message: 'El Total no puede ir vacio' })
  @IsNumber({}, { message: 'Cantidad debe ser un número' })
  total: number;

  /**
   * Cupón aplicado en la transacción
   * Debe ser una cadena de texto y no puede estar vacío
   */
  @IsOptional()
  @Transform(({ value }) => value.trim().toUpperCase())
  coupon: string;

  /**
   * Array de productos incluidos en la transacción
   * No puede estar vacío y cada elemento debe ser válido según TransactionContentsDto
   */
  @IsArray()
  @ArrayNotEmpty({ message: 'Los Contenidos no pueden ir vacios' })
  @ValidateNested()
  @Type(() => TransactionContentsDto)
  contents: TransactionContentsDto[];
}
