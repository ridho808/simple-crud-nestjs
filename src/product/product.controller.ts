import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, Res, HttpStatus, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) : any{
    try {
      return this.productService.create(createProductDto);
    } catch (error) {
      throw new HttpException('message', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get("ListOne")
  findOne(@Query('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
