import { Product } from '../../products/entities/product.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

/**
 * Entidad que representa una transacción de venta
 */
@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  /** Monto total de la transacción */
  @Column('decimal')
  total: number;

  /** Cupón aplicado en la transacción */
  @Column({ type: 'varchar', length: 30, nullable: true })
  coupon: string;

  /** Descuento aplicado en la transacción */
  @Column({ type: 'decimal', scale: 1, nullable: true })
  discount: number;

  /** Fecha y hora en que se realizó la transacción */
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  transactionDate: Date;

  /** Productos incluidos en la transacción */
  @OneToMany(
    () => TransactionContents,
    (transaction) => transaction.transaction,
  )
  contents: TransactionContents[];
}

/**
 * Entidad que representa el detalle de productos en una transacción
 */
@Entity()
export class TransactionContents {
  @PrimaryGeneratedColumn()
  id: number;

  /** Cantidad del producto */
  @Column('int')
  quantity: number;

  /** Precio unitario del producto */
  @Column('decimal')
  price: number;

  /** Referencia al producto */
  @ManyToOne(() => Product, (product) => product.id, {
    eager: true,
    cascade: true,
  })
  product: Product;

  /** Referencia a la transacción principal */
  @ManyToOne(() => Transaction, (transaction) => transaction.contents, {
    eager: true,
    cascade: true,
  })
  transaction: Transaction;
}
