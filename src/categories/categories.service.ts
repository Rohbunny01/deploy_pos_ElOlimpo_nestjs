/* Servicio de categorías 
Tambien conocido donde se crean Los CRUD o la logica de negocio */

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  // Inyección del repositorio de Category para interactuar con la base de datos
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  // Crea una nueva categoría en la base de datos
  create(createCategoryDto: CreateCategoryDto) {
    const category = new Category();
    category.name = createCategoryDto.name;
    return this.categoryRepository.save(category);
  }

  // Obtiene todas las categorías de la base de datos
  findAll() {
    return this.categoryRepository.find();
  }

  /**
   * Busca una categoría específica por ID
   *
   * @param id - El ID de la categoría a buscar
   * @param products - Parámetro opcional que indica si se deben cargar los productos relacionados
   * @returns La categoría encontrada con sus productos si se solicitaron
   * @throws NotFoundException - Si no se encuentra la categoría con el ID proporcionado
   *
   * Cambios realizados:
   * - Se agregó documentación detallada del método y sus parámetros
   * - Se documentó el comportamiento de carga de relaciones
   * - Se especificó la excepción que puede lanzar
   * - Se eliminó el console.log usado para debugging
   */
  async findOne(id: number, products?: string) {
    const options: FindOneOptions<Category> = {
      where: { id },
    };

    if (products === 'true') {
      options.relations = {
        products: true,
      };
      options.order = {
        id: 'ASC',
      };
    }

    const category = await this.categoryRepository.findOne(options);
    if (!category) {
      throw new NotFoundException('La categoría no existe');
    }
    return category;
  }

  // Actualiza una categoría existente
  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);
    category.name = updateCategoryDto.name;
    return await this.categoryRepository.save(category);
  }

  // Elimina una categoría existente de la base de datos
  // Lanza NotFoundException si la categoría no se encuentra
  async remove(id: number) {
    const category = await this.findOne(id);
    return await this.categoryRepository.remove(category);
  }
}
