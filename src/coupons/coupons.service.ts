import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Repository } from 'typeorm';
import { Coupon } from './entities/coupon.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  parse,
  isValid,
  isPast,
  startOfDay,
  endOfDay,
  isAfter,
} from 'date-fns';
import { ApplyCouponDto } from './dto/apply-coupon.dto';

@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,
  ) {}

  async create(createCouponDto: CreateCouponDto) {
    try {
      // Verificar si ya existe un cupón con el mismo nombre normalizado
      const existingCoupon = await this.couponRepository.findOne({
        where: { name: createCouponDto.name },
      });

      if (existingCoupon) {
        throw new BadRequestException(['Ya existe un cupón con este nombre']);
      }

      const coupon = this.couponRepository.create({
        ...createCouponDto,
        expirationDate: startOfDay(createCouponDto.expirationDate),
      });

      return await this.couponRepository.save(coupon);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(['Error al procesar el cupón']);
    }
  }

  findAll() {
    return this.couponRepository.find();
  }

  async findOne(id: number) {
    const coupon = await this.couponRepository.findOneBy({ id });
    if (!coupon) {
      throw new NotFoundException([
        `El cupón con el ID: ${id} no fue encontrado`,
      ]);
    }
    return coupon;
  }

  async update(id: number, updateCouponDto: UpdateCouponDto) {
    const coupon = await this.findOne(id);
    Object.assign(coupon, updateCouponDto);
    return await this.couponRepository.save(coupon);
  }

  async remove(id: number) {
    try {
      const coupon = await this.findOne(id);
      await this.couponRepository.remove(coupon);
      return {
        message: `El cupón ${coupon.name} fue eliminado correctamente`,
        coupon,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(['Error al eliminar el cupón']);
    }
  }

  async applyCoupon(couponName: string) {
    const coupon = await this.couponRepository.findOneBy({ name: couponName });

    if (!coupon) {
      throw new NotFoundException([
        `El cupón con el nombre: ${couponName} no fue encontrado`,
      ]);
    }

    const currentDate = new Date();
    const expirationDate = endOfDay(coupon.expirationDate);

    if (isAfter(currentDate, expirationDate)) {
      throw new UnprocessableEntityException(['El cupón ha expirado']);
    }

    return {
      message: 'Cupón aplicado correctamente',
      ...coupon, // los 3 puntos es para devolver el resto de las propiedades del cupón de forma desestructurada
    };
  }
}
