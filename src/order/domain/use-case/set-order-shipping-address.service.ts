import { Order } from '../entity/order.entity';
import { SetOrderShippingAddressDto } from '../dto/set-order-shipping-Address.dto';
import { OrderRepositoryInterface } from '../port/order.repository.interface';

export class SetOrderShippingAddressService {
  constructor(private orderRepository: OrderRepositoryInterface) {}

  async setOrderShippingAddress(
    setOrderShippingAddressDto: SetOrderShippingAddressDto,
  ): Promise<Order> {
    const order = await this.orderRepository.findById(
      setOrderShippingAddressDto.orderId,
    );

    if (!order) {
      throw new Error('Order not found');
    }

    order.setShippingAddress(setOrderShippingAddressDto.shippingAddress);

    return this.orderRepository.save(order);
  }
}
