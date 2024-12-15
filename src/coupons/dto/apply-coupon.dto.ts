import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class ApplyCouponDto {
  @IsNotEmpty({ message: 'El nombre del cupón es requerido' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @Transform(({ value }) => value.trim().toUpperCase())
  coupon_name: string;
}
