import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    ManyToMany
  } from "typeorm";

import { User } from "./User";
import { Product } from "./Product";
  
  @Entity({name:'order'})
  export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({nullable:false})
    total: number;
  
    @Column()
    payment: string;
  
    @ManyToOne(() => User, {
      cascade: true, eager:true
    }) 
    client: User;  
  
    @ManyToMany(() => Product, {
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
  