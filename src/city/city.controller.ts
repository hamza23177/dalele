/* eslint-disable prettier/prettier */
// src/city/city.controller.ts
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
import { CityService } from './city.service';
import { City } from './entities/city/city';

@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  create(@Body() data: Partial<City>) {
    return this.cityService.create(data);
  }

  @Get()
  findAll() {
    return this.cityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cityService.findOne(id);
  }

  @Get('/by-governorate/:governorateId')
findByGovernorate(@Param('governorateId', ParseIntPipe) governorateId: number) {
  return this.cityService.findByGovernorate(governorateId);
}

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: Partial<City>) {
    return this.cityService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cityService.remove(id);
  }
}
