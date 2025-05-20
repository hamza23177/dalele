/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GovernorateService } from './governorate.service';
import { GovernorateController } from './governorate.controller';
import { Governorate } from './entities/governorate/governorate';

@Module({
  imports: [TypeOrmModule.forFeature([Governorate])],
  providers: [GovernorateService],
  controllers: [GovernorateController]
})
export class GovernorateModule {}
