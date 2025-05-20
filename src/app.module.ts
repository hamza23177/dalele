/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GovernorateModule } from './governorate/governorate.module';
import { CityModule } from './city/city.module';
import { CategoryModule } from './category/category.module';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    
    ConfigModule.forRoot({ isGlobal: true }),
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        autoLoadEntities: true,
        synchronize: true,
}),
      GovernorateModule,
      CityModule,
      CategoryModule,
      SubcategoryModule,
      UserModule,
      CompanyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
