import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../../src/app.module';
import { Order } from 'src/order/domain/entity/order.entity';

// Pour run le test : npm run test:e2e get-orders

// AAA

// Arrange
// préparer les données pour que le test soit valide
// GIVEN

// ACT
// faire la requête avec la bonne url, les bons query params, la bonne méthode
// HTTP, et les bonnes données dans le body
// WHEN

// ASSERT
// Vérifier que les données retournées par le ACT, correspondent à ce qui est attendu
// THEN

describe('Get Orders (e2e)', () => {
  let app: INestApplication;
  let order1: Order;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    //order1 = création d'une commande en BDD de test
  });

  it('should return all', async () => {
    const responseGetOrders = await request(app.getHttpServer()).get('/orders');

    expect(responseGetOrders.status).toBe(200);
    // expect(responseGetOrders.body).toStrictEqual([]);

    responseGetOrders.body.map((orderFromResponse) => {
      expect(orderFromResponse.id).toStrictEqual(order1.id);
    });
  });
});
