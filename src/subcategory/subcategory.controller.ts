/* eslint-disable prettier/prettier */
// src/subcategory/subcategory.controller.ts
import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { SubCategoryService } from './subcategory.service';
import { SubCategory } from './entities/subcategory/subcategory';

@Controller('subcategories')
export class SubCategoryController {
  constructor(private readonly subService: SubCategoryService) {}

  @Post()
  create(@Body() data: Partial<SubCategory>) {
    return this.subService.create(data);
  }

  @Get()
  findAll() {
    return this.subService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.subService.findOne(id);
  }

  @Get('by-category/:categoryId')
findByCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
  return this.subService.findByCategory(categoryId);
}

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: Partial<SubCategory>) {
    return this.subService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.subService.remove(id);
  }
}
