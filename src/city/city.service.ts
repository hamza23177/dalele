/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from './entities/city/city';
import { Repository } from 'typeorm';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private cityRepo: Repository<City>,
  ) {}

  create(data: Partial<City>) {
    const city = this.cityRepo.create(data);
    return this.cityRepo.save(city);
  }

  findAll() {
    return this.cityRepo.find({ relations: ['governorate'] });
  }

  async findOne(id: number) {
    const city = await this.cityRepo.findOne({
      where: { id },
      relations: ['governorate'],
    });
    if (!city) throw new NotFoundException('City not found');
    return city;
  }

  async findByGovernorate(governorateId: number) {
  return this.cityRepo.find({
    where: {
      governorate: { id: governorateId },
    },
    relations: ['governorate'],
  });
}

  async update(id: number, data: Partial<City>) {
    const city = await this.findOne(id);
    Object.assign(city, data);
    return this.cityRepo.save(city);
  }

  async remove(id: number) {
    const city = await this.findOne(id);
    return this.cityRepo.remove(city);
  }
}
