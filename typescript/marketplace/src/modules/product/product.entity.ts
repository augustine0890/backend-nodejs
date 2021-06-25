import { IsNumber } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Shop } from '../shop/shop.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: 'image', nullable: true })
  image?: string;

  @Column()
  category: string;

  @Column({ nullable: false })
  quantity: number;

  @Column({ nullable: false, type: 'float' })
  price: number;

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

  @ManyToOne(() => Shop, (shop: Shop) => shop.products)
  shop: Shop;
}
