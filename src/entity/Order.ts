import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    Generated,
    JoinTable,
    JoinColumn
  } from "typeorm";

import { User } from "./User";
import { OrderItem } from "./OrderItem";
  
  @Entity({name:'orders'})
  export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    total: number;
  
    @Column({nullable:true})
    payment: string;

    @Column({default:"ARS"})
    currency: string;

    @Column()
    @Generated("uuid")
    reference: string;
  
    @ManyToOne(() => User, {
      cascade: true, eager:true
    }) 
    client: User;  
  
    @OneToMany(() => OrderItem,  orderItem => orderItem.order, {eager:true})
    items: OrderItem[];  

    @Column({default:true})
    status: boolean;

    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
  }
  