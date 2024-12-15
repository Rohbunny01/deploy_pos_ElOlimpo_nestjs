import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductsQueryDto } from './dto/get-product.dto';
import { IdValidationPipe } from '../common/pipes/id-validation/id-validation.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadImageService } from '../upload-image/upload-image.service';

/**
 * Controlador para la gestión de productos
 * Maneja todas las operaciones CRUD relacionadas con productos
 * @route /products
 */
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly uploadImageService: UploadImageService,
  ) {}

  /**
   * Crea un nuevo producto
   * @route POST /products
   * @param createProductDto - Datos del producto a crear
   * @returns Producto creado
   */
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    console.log(createProductDto);
    return this.productsService.create(createProductDto);
  }

  /**
   * Obtiene una lista de productos con opciones de filtrado y paginación
   * @route GET /products
   * @param query - Parámetros de consulta (categoría, límite y offset)
   * @returns Lista de productos paginada
   */
  @Get()
  findAll(@Query() query: GetProductsQueryDto) {
    const category = query.category_id ? query.category_id : null;
    const take = query.take ? query.take : 10; // Por defecto 10 productos
    const skip = query.skip ? query.skip : 0; // Por defecto desde el inicio
    return this.productsService.findAll(category, take, skip);
  }

  /**
   * Obtiene un producto específico por su ID
   * @route GET /products/:id
   * @param id - ID del producto
   * @returns Producto encontrado
   */
  @Get(':id')
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.productsService.findOne(+id);
  }

  /**
   * Actualiza un producto existente
   * @route PUT /products/:id
   * @param id - ID del producto a actualizar
   * @param updateProductDto - Datos actualizados del producto
   * @returns Producto actualizado
   */
  @Put(':id')
  update(
    @Param('id', IdValidationPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(+id, updateProductDto);
  }

  /**
   * Elimina un producto
   * @route DELETE /products/:id
   * @param id - ID del producto a eliminar
   * @returns Resultado de la eliminación
   */
  @Delete(':id')
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.productsService.remove(+id);
  }

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No se subió ninguna imagen');
    }
    return this.uploadImageService.uploadFile(file);
  }
}
