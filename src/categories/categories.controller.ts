/* Controlador de categorías
O mejor conocido donde se obtiene la informacion del servicio */

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';

import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { IdValidationPipe } from '../common/pipes/id-validation/id-validation.pipe';

@Controller('categories')
export class CategoriesController {
  // Inyección del servicio de categorías
  constructor(private readonly categoriesService: CategoriesService) {}

  // Crea una nueva categoría
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  // Obtiene todas las categorías
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  /**
   * Obtiene una categoría específica por su ID
   * 
   * @param id - El ID de la categoría a buscar (validado por IdValidationPipe)
   * @param products - Parámetro opcional que indica si se deben incluir los productos relacionados
   * @returns La categoría encontrada, opcionalmente con sus productos relacionados
   */
  @Get(':id')
  findOne(
    @Param('id', IdValidationPipe) // Valida que el ID sea válido
    id: string,
    @Query('products') products?: string,
  ) {
    return this.categoriesService.findOne(+id, products);
  }

  // Actualiza una categoría existente
  @Patch(':id')
  update(
    @Param('id', IdValidationPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  // Elimina una categoría por su ID
  @Delete(':id')
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.categoriesService.remove(+id);
  }
}
