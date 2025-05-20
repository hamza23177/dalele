/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category/category';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  create(data: Partial<Category>) {
    const category = this.categoryRepo.create(data);
    return this.categoryRepo.save(category);
  }

  findAll() {
    return this.categoryRepo.find({ relations: ['city'] });
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: ['city'],
    });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async update(id: number, data: Partial<Category>) {
    const category = await this.findOne(id);
    Object.assign(category, data);
    return this.categoryRepo.save(category);
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    return this.categoryRepo.remove(category);
  }

  async findByCity(cityId: number) {
    return this.categoryRepo.find({
      where: {
        city: { id: cityId },
      },
      relations: ['city'],
    });
  }
}
