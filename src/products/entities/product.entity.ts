import { Category } from '../../categories/entities/category.entity';
import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from 'typeorm';

@Entity() // Define una tabla en la base de datos
export class Product {
  @PrimaryGeneratedColumn() // Clave primaria autoincremental
  id: number;

  @Column({ type: 'varchar', length: 255 }) // Columna para el nombre del producto
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    default: 'default.svg', // Imagen por defecto si no se proporciona una
  })
  image: string;

  @Column({ type: 'decimal' }) // Precio del producto
  price: number;

  @Column({ type: 'int' }) // Cantidad disponible en inventario
  inventory: number;

  @Column({ type: 'int' })
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.products) // Relación muchos a uno con la entidad Category
  @JoinColumn({ name: 'categoryId' })
  category: Category;
}
