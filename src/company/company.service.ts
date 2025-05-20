/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class CompanyService {
    getCompanyInfo() {
    return {
      name: 'دليل المدينة',
      about: 'نحن شركة متخصصة في تقديم الحلول التقنية المبتكرة للمؤسسات والأفراد.',
      phone: '+0951255464',
      location: 'دمشق - دوما',
    };
  }
}
