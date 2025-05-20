/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Governorate } from './entities/governorate/governorate';

@Injectable()
export class GovernorateService {
  constructor(
    @InjectRepository(Governorate)
    private governorateRepo: Repository<Governorate>,
  ) {}

  create(data: Partial<Governorate>) {
    const gov = this.governorateRepo.create(data);
    return this.governorateRepo.save(gov);
  }

  findAll() {
    return this.governorateRepo.find();
  }

  async findOne(id: number) {
    const gov = await this.governorateRepo.findOneBy({ id });
    if (!gov) throw new NotFoundException('Governorate not found');
    return gov;
  }

  async update(id: number, data: Partial<Governorate>) {
    const gov = await this.findOne(id);
    Object.assign(gov, data);
    return this.governorateRepo.save(gov);
  }

  async remove(id: number) {
    const gov = await this.findOne(id);
    return this.governorateRepo.remove(gov);
  }
}
