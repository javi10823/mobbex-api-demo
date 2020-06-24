import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";


@Entity({name:'users'})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:false})
  email: string;

  @Column({nullable:false})
  password: string;

  @Column({nullable:false})
  name: string;

  @Column({nullable:false})
  lastname: string;

  @Column({nullable:false})
  phone: string;

  @Column({nullable:true})
  address: string;

  @Column({default:true})
  status: boolean;
  
  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
