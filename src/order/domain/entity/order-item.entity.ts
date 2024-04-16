import { Order } from '../entity/order.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order-item')
export class OrderItem {
  constructor(productName: string, quantity: number, price: number) {
    this.verifyNameIsCorrect(productName);

    if (quantity <= 0) {
      throw new Error('Quantity must be greater than 0');
    }

    if (quantity > 2) {
      throw new Error('Quantity must be less than or equal to 2');
    }

    this.productName = productName;
    this.quantity = quantity;
    this.price = price;
  }

  verifyNameIsCorrect(productName: string) {
    if (productName === '') {
      throw new Error('Product name is required');
    }
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  productName: string;

  @Column({
    type: 'int',
  })
  quantity: number;

  @Column({
    type: 'int',
  })
  price: number;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;

  getTotalPrice(): number {
    return this.quantity * this.price;
  }
}
