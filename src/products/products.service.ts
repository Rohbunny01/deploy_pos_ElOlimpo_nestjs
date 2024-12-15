import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    // Verificación de producto duplicado
    const existingProduct = await this.productRepository.findOne({
      where: { name: createProductDto.name },
    });

    if (existingProduct) {
      let errors: string[] = [];
      errors.push('Ya existe un producto con este nombre');
      throw new BadRequestException(errors);
    }

    // Verificación de categoría existente
    const category = await this.categoryRepository.findOneBy({
      id: createProductDto.categoryId,
    });

    if (!category) {
      let errors: string[] = [];
      errors.push('Categoría no existe');
      throw new NotFoundException(errors);
    }

    // Creación del producto
    return this.productRepository.save({
      ...createProductDto,
      category,
    });
  }

  async findAll(categoryId: number, take: number, skip: number) {
    const options: FindManyOptions<Product> = {
      relations: {
        category: true, // Incluye los datos de la categoría relacionada
      },
      order: {
        id: 'DESC', // Ordena los resultados por ID de forma descendente
      },
      take,
      skip,
    };
    // Si se proporciona un ID de categoría, filtra los productos por esa categoría
    if (categoryId) {
      options.where = {
        category: {
          id: categoryId, // Filtra por el ID de la categoría especificada
        },
      };
    }

    // Si no se proporciona categoryId, obtiene todos los productos
    const [productos, total] =
      await this.productRepository.findAndCount(options);

    return { productos, total }; // Retorna objeto con productos y total
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: {
        category: true,
      },
    });
    if (!product) {
      throw new NotFoundException(
        `El Producto con el ID: ${id} no fue encontrado`,
      );
    }

    // Asegúrate de que el categoryId esté incluido en la respuesta
    return {
      ...product,
      categoryId: product.category?.id,
    };
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);

    if (updateProductDto.categoryId) {
      const category = await this.categoryRepository.findOneBy({
        id: updateProductDto.categoryId,
      });

      if (!category) {
        let errors: string[] = [];
        errors.push('Categoría no existe');
        throw new NotFoundException(errors);
      }
      product.category = category;
    }
    return await this.productRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);

    await this.productRepository.remove(product);
    return { message: 'Producto eliminado correctamente' };
  }
}
