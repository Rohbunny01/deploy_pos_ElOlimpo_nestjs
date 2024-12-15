/**
 * Entidad de Categoría
 *
 * Representa una categoría de productos en la base de datos.
 * Esta entidad maneja la información de las categorías y su relación con los productos.
 */

import { Product } from '../../products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // Define una tabla en la base de datos
export class Category {
  @PrimaryGeneratedColumn() // Clave primaria autoincremental
  id: number;

  @Column({ type: 'varchar', length: 255 }) // Columna para el nombre de la categoría
  name: string;

  @OneToMany(() => Product, (product) => product.category, {
    cascade: true,
  }) // Relación uno a muchos con la entidad Product
  products: Product[]; // Array de productos asociados a esta categoría
}
