/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {
      constructor(private readonly companyService: CompanyService) {}

  @Get()
  getCompanyInfo() {
    return this.companyService.getCompanyInfo();
  }
}
