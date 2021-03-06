import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../auth/user.entity';
import { Product } from '../product/product.entity';

@Entity('shops')
export class Shop {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'image', nullable: true })
  image?: string;

  @Column()
  description: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  update_at: Date;

  @OneToMany(() => Product, (product: Product) => product.shop)
  products: Product[];

  @ManyToOne(() => User, (onwer: User) => onwer.shops)
  owner: User;
}
