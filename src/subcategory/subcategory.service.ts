/* eslint-disable prettier/prettier */
// src/subcategory/subcategory.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubCategory } from './entities/subcategory/subcategory';
import { Category } from '../category/entities/category/category';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectRepository(SubCategory)
    private subRepo: Repository<SubCategory>,

    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  async create(data: Partial<SubCategory>) {
    const category = await this.categoryRepo.findOne({
      where: { id: data.category?.id },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const subCategory = this.subRepo.create({
      ...data,
      category,
    });

    return this.subRepo.save(subCategory);
  }

  findAll() {
    return this.subRepo.find({ relations: ['category'] });
  }

  async findOne(id: number) {
    const sub = await this.subRepo.findOne({ where: { id }, relations: ['category'] });
    if (!sub) throw new NotFoundException('SubCategory not found');
    return sub;
  }

  async findByCategory(categoryId: number) {
  const category = await this.categoryRepo.findOne({
    where: { id: categoryId },
  });

  if (!category) {
    throw new NotFoundException('Category not found');
  }

  return this.subRepo.find({
    where: { category: { id: categoryId } },
    relations: ['category'],
  });
}

  async update(id: number, data: Partial<SubCategory>) {
    const sub = await this.findOne(id);
    Object.assign(sub, data);
    return this.subRepo.save(sub);
  }

  async remove(id: number) {
    const sub = await this.findOne(id);
    return this.subRepo.remove(sub);
  }
}
