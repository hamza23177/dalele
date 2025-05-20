/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,OneToMany } from 'typeorm';
import { City } from '../../../city/entities/city/city';
import { SubCategory } from '../../../subcategory/entities/subcategory/subcategory';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => City, (city) => city.categories, {
    onDelete: 'CASCADE',
  })
  city: City;

    @OneToMany(() => SubCategory, (sub) => sub.category, {
    cascade: true,
  })
  subCategories: SubCategory[];
}
