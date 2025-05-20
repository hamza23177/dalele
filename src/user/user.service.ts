/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user/user';
import { Repository } from 'typeorm';
import { SubCategory } from '../subcategory/entities/subcategory/subcategory';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,

    @InjectRepository(SubCategory)
    private subCategoryRepo: Repository<SubCategory>,
  ) {}

  async create(data: Partial<User>) {
    const subCategory = await this.subCategoryRepo.findOne({
      where: { id: data.subCategory?.id },
    });

    if (!subCategory) throw new NotFoundException('SubCategory not found');

    const user = this.userRepo.create({ ...data, subCategory });
    return this.userRepo.save(user);
  }

  findAll() {
    return this.userRepo.find({ relations: ['subCategory'] });
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({ where: { id }, relations: ['subCategory'] });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: number, data: Partial<User>) {
    const user = await this.findOne(id);
    Object.assign(user, data);
    return this.userRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.userRepo.remove(user);
  }

  async findBySubCategory(subId: number) {
    return this.userRepo.find({
      where: { subCategory: { id: subId } },
      relations: ['subCategory'],
    });
  }
}
