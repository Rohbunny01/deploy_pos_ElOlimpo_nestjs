import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsString({
    message: 'El nombre de la categoría debe ser una cadena de texto',
  }) // Valida que el campo sea una cadena de texto
  @IsNotEmpty({ message: 'El nombre de la categoría es requerido' }) // Valida que el campo no esté vacío
  name: string;
}