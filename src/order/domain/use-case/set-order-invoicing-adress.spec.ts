import { Order } from '../entity/order.entity';
import { OrderStatus } from '../enum/order-status.enum';
import { OrderRepositoryInterface } from '../port/order.repository.interface';
import { SetOrderInvoicingAdressService } from './set-order-invoicing-adress.service';

describe('set order shipping address', () => {
  const order = new Order('John Doe', []);

  const orderRepositoryMock = {
    findById() {
      return order;
    },
    save(order: Order) {
      return order;
    },
  } as unknown as OrderRepositoryInterface;

  it('should update an order with a invoicing method', async () => {
    const seOrderInvoicingAdressService = new SetOrderInvoicingAdressService(
      orderRepositoryMock,
    );
    const orderUpdated =
      await seOrderInvoicingAdressService.setOrderInvoicingAdress({
        orderId: '123',
        invoiceAddress: '123 Main St.',
      });

    expect(orderUpdated.invoiceAddress).toBe('123 Main St.');
    expect(orderUpdated.status).toBe(OrderStatus.INVOICE_ADRESS_SET);
  });
});
