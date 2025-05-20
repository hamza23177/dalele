/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GovernorateModule } from './governorate/governorate.module';
import { CityModule } from './city/city.module';
import { CategoryModule } from './category/category.module';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
@Module({
  imports: [
      TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '23177',
      database: 'daleleDB',
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
