import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Transaction,
  TransactionContents,
} from './entities/transaction.entity';
import { Between, FindManyOptions, Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { endOfDay, isValid, parseISO, startOfDay } from 'date-fns';
import { CouponsService } from '../coupons/coupons.service';

/**
 * Servicio para gestionar las transacciones de venta
 *
 * Este servicio maneja todas las operaciones relacionadas con las transacciones,
 * incluyendo la creación, consulta y eliminación de ventas. También gestiona
 * la actualización automática del inventario cuando se realizan ventas.
 */
@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(TransactionContents)
    private readonly transactionContentsRepository: Repository<TransactionContents>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly couponsService: CouponsService,
  ) {}

  //==============================================
  //  CREAR TRANSACCIÓN
  //==============================================
  /**
   * Crea una nueva transacción de venta
   * @param createTransactionDto - DTO con los datos de la transacción a crear
   * @throws BadRequestException - Si no hay suficiente inventario
   * @throws NotFoundException - Si algún producto no existe
   * @returns Mensaje de confirmación
   */
  async create(createTransactionDto: CreateTransactionDto) {
    // Iniciamos una transacción en la base de datos para asegurar la integridad de los datos
    await this.productRepository.manager.transaction(
      async (transactionEntityManager) => {
        // Creamos una nueva instancia de Transaction
        const transaction = new Transaction();
        // Calculamos el total de la transacción multiplicando cantidad por precio de cada item

        const total = createTransactionDto.contents.reduce(
          (total, item) => total + item.quantity * item.price,
          0,
        );
        transaction.total = total;

        if (createTransactionDto.coupon) {
          const coupon = await this.couponsService.applyCoupon(
            createTransactionDto.coupon,
          );
          const discount = (coupon.porcentaje / 100) * total;
          transaction.discount = discount;
          transaction.coupon = coupon.name;
          transaction.total -= discount;
        }

        // Iteramos sobre cada producto en el contenido de la transacción
        for (const contents of createTransactionDto.contents) {
          // Buscamos el producto en la base de datos
          const product = await transactionEntityManager.findOneBy(Product, {
            id: contents.productId,
          });

          const errors = [];

          // Validamos que el producto exista
          if (!product) {
            errors.push(
              `El producto con el ID: ${contents.productId} no existe`,
            );
            throw new NotFoundException(errors);
          }

          // Validamos que haya suficiente inventario
          if (contents.quantity > product.inventory) {
            errors.push(
              `El articulo ${product.name} excede la cantidad disponible`,
            );
            throw new BadRequestException(errors);
          }

          // Actualizamos el inventario del producto
          product.inventory -= contents.quantity;

          // Crear Instancia de TransactionContents
          const transactionContent = new TransactionContents();
          transactionContent.price = contents.price;
          transactionContent.product = product;
          transactionContent.quantity = contents.quantity;
          transactionContent.transaction = transaction;

          // Guardamos tanto la transacción como su contenido
          await transactionEntityManager.save(transaction);
          await transactionEntityManager.save(transactionContent);
        }
      },
    );

    // Retornamos mensaje de éxito
    return { message: 'Venta Almacenada Correctamente' };
  }

  //==============================================
  //  OBTENER TODAS LAS TRANSACCIONES
  //==============================================
  /**
   * Recupera todas las transacciones, opcionalmente filtradas por fecha
   * @param transactionDate - Fecha opcional para filtrar transacciones (formato ISO)
   * @throws BadRequestException - Si el formato de fecha es inválido
   * @returns Array de transacciones encontradas
   */
  async findAll(transactionDate?: string) {
    const options: FindManyOptions<Transaction> = {
      relations: {
        contents: true,
      },
    };

    if (transactionDate) {
      const date = parseISO(transactionDate);
      if (!isValid(date)) {
        throw new BadRequestException('Fecha inválida');
      }

      const start = startOfDay(date);
      const end = endOfDay(date);

      options.where = {
        transactionDate: Between(start, end),
      };
    }

    // Buscamos todas las transacciones en la base de datos
    return this.transactionRepository.find(options);
  }

  //==============================================
  //  OBTENER TRANSACCIÓN POR ID
  //==============================================
  /**
   * Busca una transacción específica por su ID
   * @param id - ID de la transacción a buscar
   * @throws NotFoundException - Si la transacción no existe
   * @returns Transacción encontrada con sus contenidos
   */
  async findOne(id: number) {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
      relations: {
        contents: true,
      },
    });

    if (!transaction) {
      throw new NotFoundException('Transacción no encontrada');
    }

    return transaction;
  }

  //==============================================
  //  ELIMINAR TRANSACCIÓN
  //==============================================
  /**
   * Elimina una transacción y sus contenidos asociados
   * @param id - ID de la transacción a eliminar
   * @throws NotFoundException - Si la transacción no existe
   * @returns Mensaje de confirmación
   */
  async remove(id: number) {
    const transaction = await this.findOne(id);

    for (const contents of transaction.contents) {
      const product = await this.productRepository.findOneBy({
        id: contents.product.id,
      });
      product.inventory += contents.quantity;
      await this.productRepository.save(product);

      const transactionContent =
        await this.transactionContentsRepository.findOneBy({
          id: contents.id,
        });
      await this.transactionContentsRepository.remove(transactionContent);
    }

    await this.transactionRepository.remove(transaction);
    return { message: 'Transacción eliminada correctamente' };
  }
}
