import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
  } from "typeorm";
  
  import {Category} from './Category';
  
  @Entity({name:'products'})
  export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({nullable:false})
    name: string;
  
    @Column({nullable:false})
    price: number;
  
    @Column()
    description: string;
   
    @ManyToOne(() => Category,{eager:true}) 
    category: Category;  
  
    @Column({default:true})
    status: boolean;

    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
  }
  