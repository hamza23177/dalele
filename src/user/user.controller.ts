/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UserService } from './user.service';
import { User } from './entities/user/user';
import { Express } from 'express';

const imageBaseUrl = 'http://localhost:3000/images'; // عدله إذا كنت تستخدم دومين آخر أو ngrok

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './images',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const fileName = `user-${uniqueSuffix}${ext}`;
          callback(null, fileName);
        },
      }),
    }),
  )
  async create(
    @Body() data: Partial<User>,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const userData: Partial<User> = {
      ...data,
      image: file?.filename,
    };
    const user = await this.userService.create(userData);
    return this.addImageUrl(user);
  }

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return users.map(this.addImageUrl);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findOne(id);
    return this.addImageUrl(user);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './images',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const fileName = `user-${uniqueSuffix}${ext}`;
          callback(null, fileName);
        },
      }),
    }),
  )
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<User>,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const updatedData: Partial<User> = {
      ...data,
    };

    if (file) {
      updatedData.image = file.filename;
    }

    const updatedUser = await this.userService.update(id, updatedData);
    return this.addImageUrl(updatedUser);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }

  @Get('/by-sub/:subCategoryId')
  async findBySub(@Param('subCategoryId', ParseIntPipe) subId: number) {
    const users = await this.userService.findBySubCategory(subId);
    return users.map(this.addImageUrl);
  }

  private addImageUrl = (user: any) => {
    if (user?.image) {
      return {
        ...user,
        imageUrl: `${imageBaseUrl}/${user.image}`,
      };
    }
    return user;
  };
}
