import { Order } from '../entity/order.entity';
import { OrderRepositoryInterface } from '../port/order.repository.interface';

export class GetOrdersByCustomerService {
  constructor(private orderRepository: OrderRepositoryInterface) {}

  async getOrdersByCustomer(customerName: string): Promise<Order[]> {
    const orders = this.orderRepository.findByCustomerName(customerName);

    return orders;
  }
}
