import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
  } from "typeorm";

import { Product } from "./Product";
  
  @Entity({name:'category'})
  export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({nullable:false})
    name: string;
  
    @Column()
    description: string;
  
    @OneToMany(() => Product, product => product.category, {
      cascade: true, eager:true
    }) 
    products: Product[];  
  
    @Column({default:true})
    status: boolean;

    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
  }
  