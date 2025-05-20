/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { SubCategoryService } from './subcategory.service';

describe('SubcategoryService', () => {
  let service: SubCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubCategoryService],
    }).compile();

    service = module.get<SubCategoryService>(SubCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
