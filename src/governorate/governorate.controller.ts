/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { GovernorateService } from './governorate.service';
import { Governorate } from './entities/governorate/governorate';

@Controller('governorate')
export class GovernorateController {
  constructor(private readonly governorateService: GovernorateService) {}

  @Post()
  create(@Body() data: Partial<Governorate>) {
    return this.governorateService.create(data);
  }

  @Get()
  findAll() {
    return this.governorateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.governorateService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Governorate>,
  ) {
    return this.governorateService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.governorateService.remove(id);
  }
}
