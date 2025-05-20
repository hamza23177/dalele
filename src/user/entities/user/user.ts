/* eslint-disable prettier/prettier */
// src/user/entities/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { SubCategory } from '../../../subcategory/entities/subcategory/subcategory';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  image?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ nullable: true })
  location?: string;

  @ManyToOne(() => SubCategory, (sub) => sub.users, { onDelete: 'CASCADE' })
  subCategory: SubCategory;
}
