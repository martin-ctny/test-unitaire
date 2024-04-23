import { CreateOrderItemDto } from '../dto/create-order.dto';
import { OrderItem } from '../entity/order-item.entity';
import { OrderStatus } from '../enum/order-status.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
  constructor(customerName: string, orderItems: OrderItem[]) {
    this.customerName = customerName;
    this.orderItems = orderItems;
    this.createdAt = new Date();

    this.status = OrderStatus.CART;
  }

  @CreateDateColumn()
  createdAt: Date;

  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true })
  price: number;

  @Column()
  customerName: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    nullable: true,
  })
  orderItems: OrderItem[];

  @Column({ nullable: true })
  shippingAddress: string | null;

  invoiceAddress: string | null;

  @Column({ nullable: true })
  shippingAddressSetAt: Date | null;

  @Column()
  status: OrderStatus;

  @Column({ nullable: true })
  paidAt: Date | null;

  getOrderTotalPrice(): number {
    return this.orderItems.reduce(
      (totalPrice, orderItem) => totalPrice + orderItem.getTotalPrice(),
      0,
    );
  }

  setShippingAddress(shippingAddress: string): void {
    if (shippingAddress === '') {
      throw new Error('Shipping address is required');
    }

    if (shippingAddress.length > 100) {
      throw new Error(
        'Shipping address must be less than or equal to 100 characters',
      );
    }

    this.shippingAddress = shippingAddress;
    this.shippingAddressSetAt = new Date();
    this.status = OrderStatus.SHIPPING_ADDRESS_SET;
  }

  pay() {
    if (this.status !== OrderStatus.SHIPPING_ADDRESS_SET) {
      throw new Error('You have to select a shipping adress');
    }

    this.status = OrderStatus.PAID;
    this.paidAt = new Date();
  }
  setInvoiceAddress(invoiceAddress: string): void {
    this.status = OrderStatus.INVOICE_ADRESS_SET;
    this.invoiceAddress = invoiceAddress;
  }

  addOrderItem(orderItem: CreateOrderItemDto): void {
    if (orderItem === null) {
      throw new Error('Order item is required');
    }

    if (orderItem.quantity <= 0) {
      throw new Error('Quantity must be greater than 0');
    }

    if (orderItem.quantity > 2) {
      throw new Error('Quantity must be less than or equal to 10');
    }

    if (orderItem.productName === '') {
      throw new Error('Product name is required');
    }

    if (orderItem.price <= 0) {
      throw new Error('Price must be greater than 0');
    }

    this.orderItems.push(
      new OrderItem(orderItem.productName, orderItem.quantity, orderItem.price),
    );
  }
}
