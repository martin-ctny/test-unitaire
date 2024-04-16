import { OrderRepositoryInterface } from '../port/order.repository.interface';

export class RemoveOrderService {
  constructor(private orderRepository: OrderRepositoryInterface) {}

  async removeOrder(orderId: string): Promise<void> {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new Error('Order not found');
    }

    try {
      await this.orderRepository.deleteOrder(orderId);
    } catch (error) {
      throw new Error('Error deleting order');
    }
  }
}
