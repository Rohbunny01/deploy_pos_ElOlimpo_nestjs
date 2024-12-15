import {
  IsInt,
  IsString,
  Length,
  Min,
  Max,
  IsNotEmpty,
  IsDateString,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCouponDto {
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser un texto' })
  @Length(1, 30, { message: 'El nombre debe tener entre 1 y 30 caracteres' })
  @Matches(/^[a-zA-Z0-9\s]+$/, {
    message: 'El nombre solo puede contener letras, números y espacios',
  })
  @Transform(({ value }) => value.trim().toUpperCase())
  name: string;

  @IsNotEmpty({ message: 'El porcentaje es requerido' })
  @IsInt({ message: 'El porcentaje debe ser un número entero' })
  @Min(1, { message: 'El descuento mínimo es 1%' })
  @Max(100, { message: 'El descuento máximo es 100%' })
  porcentaje: number;

  @IsNotEmpty({ message: 'La fecha de expiración es requerida' })
  @IsDateString(
    {},
    {
      message:
        'La fecha de expiración debe ser una fecha válida, Ej: Año-Mes-Dia',
    },
  )
  expirationDate: Date;
}
