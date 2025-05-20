/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SubCategoryService } from './subcategory.service';
import { SubCategoryController } from './subcategory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategory } from './entities/subcategory/subcategory';
import { Category } from '../category/entities/category/category';

@Module({
  imports: [TypeOrmModule.forFeature([SubCategory, Category])],
  providers: [SubCategoryService],
  controllers: [SubCategoryController]
})
export class SubcategoryModule {}
