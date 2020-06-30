import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
  } from "typeorm";
  
import { Product } from "./Product";
import { Order } from "./Order";
  
  @Entity({name:'orderItem'})
  export class OrderItem extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({nullable:false})
    quantity: number;
  
    @ManyToOne(() => Product,{eager:true}) 
    item: Product;  
  
    @ManyToOne(() => Order) 
    order: Order;  

    @Column()
    total: number;

    @Column({default:true})
    status: boolean;

    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
  }
  