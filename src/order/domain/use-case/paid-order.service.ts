import { Order } from '../entity/order.entity';
import { OrderRepositoryInterface } from '../port/order.repository.interface';

export class PaidOrderService {
  constructor(private orderRepository: OrderRepositoryInterface) {}

  async paidOrder(orderId: string): Promise<Order> {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new Error('Order not found');
    }

    order.pay();

    return order;
  }
}
