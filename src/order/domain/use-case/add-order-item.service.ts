import { OrderItem } from '../entity/order-item.entity';
import { Order } from '../entity/order.entity';
import { OrderRepositoryInterface } from '../port/order.repository.interface';

export class AddOrderItemService {
  constructor(private orderRepository: OrderRepositoryInterface) {}

  async addOrderItem(orderId: string, orderItem: OrderItem): Promise<Order> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    console.log(order);

    order.addOrderItem(orderItem);

    return order;
  }
}
