/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user/user';
import { SubCategory } from '../subcategory/entities/subcategory/subcategory';

@Module({
  imports: [TypeOrmModule.forFeature([User, SubCategory])],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
