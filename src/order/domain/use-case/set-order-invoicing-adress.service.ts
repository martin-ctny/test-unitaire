import { SetOrderInvoicingAddressDto } from '../dto/set-order-invoicing-adress.dto';
import { OrderStatus } from '../enum/order-status.enum';
import { OrderRepositoryInterface } from '../port/order.repository.interface';

export class SetOrderInvoicingAdressService {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  async setOrderInvoicingAdress(
    SetOrderInvoicingAddressDto: SetOrderInvoicingAddressDto,
  ) {
    const order = await this.orderRepository.findById(
      SetOrderInvoicingAddressDto.orderId,
    );

    order.setInvoiceAddress(SetOrderInvoicingAddressDto.invoiceAddress);
    return this.orderRepository.save(order);
  }
}
