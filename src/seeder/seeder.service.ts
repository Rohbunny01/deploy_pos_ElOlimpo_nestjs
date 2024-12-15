import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../categories/entities/category.entity';
import { DataSource, Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { categories } from './data/categories';
import { products } from './data/products';

/**
 * Servicio para poblar la base de datos con datos iniciales
 */
@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private dataSource: DataSource,
  ) {}

  /**
   * Método que se ejecuta automáticamente cuando se inicializa el módulo
   * Este método realiza tres operaciones secuenciales:
   * 1. Inicializa la conexión a la base de datos
   * 2. Elimina la base de datos existente
   * 3. Sincroniza el esquema de la base de datos con las entidades
   */
  async onModuleInit() {
    const connection = this.dataSource;
    await connection.dropDatabase();
    await connection.synchronize();
  }

  /**
   * Método que ejecuta el proceso de sembrado de datos
   *
   * Este método realiza dos operaciones principales:
   * 1. Guarda todas las categorías predefinidas
   * 2. Crea y guarda los productos, asociándolos con sus respectivas categorías
   */
  async seed() {
    // Guarda todas las categorías definidas en el archivo categories
    await this.categoryRepository.save(categories);

    // Itera sobre cada producto en los datos semilla
    for await (const seedProduct of products) {
      // Busca la categoría correspondiente por ID
      const category = await this.categoryRepository.findOneBy({
        id: seedProduct.categoryId,
      });

      // Crea una nueva instancia de producto y asigna sus propiedades
      const product = new Product();
      product.name = seedProduct.name;
      product.image = seedProduct.image;
      product.price = seedProduct.price;
      product.inventory = seedProduct.inventory;
      product.category = category;

      // Guarda el producto en la base de datos
      await this.productRepository.save(product);
    }
  }
}
