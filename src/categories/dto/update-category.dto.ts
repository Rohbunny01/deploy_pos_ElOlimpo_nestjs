/* DTO para actualizar una categoría  o realizar validaciones */

import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsString } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' }) // Valida que el campo no esté vacío
  name: string;
}
