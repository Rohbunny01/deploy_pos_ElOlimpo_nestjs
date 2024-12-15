import { IsNumberString, IsOptional } from 'class-validator';

/**
 * DTO para los parámetros de consulta en la obtención de productos
 * Permite filtrar y paginar los resultados
 */
export class GetProductsQueryDto {
  /**
   * ID de la categoría para filtrar productos
   * @example "1"
   * Es opcional y debe ser un número en formato string
   */
  @IsOptional()
  @IsNumberString({}, { message: 'La categoria debe ser un número' })
  category_id?: number;

  /**
   * Cantidad de productos a obtener por página
   * @example "10"
   * Es opcional y debe ser un número en formato string
   */
  @IsOptional()
  @IsNumberString({}, { message: 'La cantidad debe ser un número' })
  take: number;

  /**
   * Número de productos a saltar (para paginación)
   * @example "0"
   * Es opcional y debe ser un número en formato string
   */
  @IsOptional()
  @IsNumberString({}, { message: 'El número de página debe ser un número' })
  skip: number;
}
