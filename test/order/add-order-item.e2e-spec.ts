import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../../src/order/domain/entity/order.entity';

// Pour run le test : npm run test:e2e get-orders

describe('Add order Item (e2e)', () => {
  let app: INestApplication;
  let order1: Order;
  let orderRepository: Repository<Order>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TypeOrmModule.forFeature([Order])],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    orderRepository = moduleFixture.get('OrderRepository');
    order1 = new Order('John Doe', []);
    await orderRepository.save(order1);
    console.log(order1);
  });

  it('should return order with item', async () => {
    const orderItem = {
      productName: '123',
      quantity: 1,
      price: 100,
    };

    await request(app.getHttpServer())
      .put(`/orders/${order1.id}/order-item`)
      .send(orderItem)
      .expect(200)
      .expect((response) => {
        expect(response.body.orderItems.length).toBe(1);
        expect(response.body.orderItems[0].productName).toBe('123');
        expect(response.body.orderItems[0].quantity).toBe(1);
      });
  });
});
