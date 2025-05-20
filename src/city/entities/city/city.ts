/* eslint-disable prettier/prettier */
// src/city/entities/city.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,OneToMany } from 'typeorm';
import { Governorate } from '../../../governorate/entities/governorate/governorate';
import {Category} from '../../../category/entities/category/category'

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => Governorate, (governorate) => governorate.cities, {
    onDelete: 'CASCADE',
  })
  governorate: Governorate;

  @OneToMany(() => Category, (category) => category.city)
  categories: Category[];
}
