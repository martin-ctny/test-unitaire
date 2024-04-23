import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Order } from '../domain/entity/order.entity';
import { CreateOrderService } from '../domain/use-case/create-order.service';
import { CreateOrderDto } from '../domain/dto/create-order.dto';
import { GetOrdersService } from '../domain/use-case/get-orders.service';
import { AddOrderItemService } from '../domain/use-case/add-order-item.service';
import { OrderItem } from '../domain/entity/order-item.entity';

@Controller('/orders')
export default class OrderController {
  constructor(
    private readonly createOrderService: CreateOrderService,
    private readonly getOrdersService: GetOrdersService,
    private readonly addOrderItemService: AddOrderItemService,
  ) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.createOrderService.createOrder(createOrderDto);
  }

  @Put('/:orderId/order-item')
  async addOrderItem(
    @Param('orderId') orderId: string,
    @Body() orderItem: OrderItem,
  ): Promise<Order> {
    return this.addOrderItemService.addOrderItem(orderId, orderItem);
  }

  @Get()
  async getOrders(): Promise<Order[]> {
    return this.getOrdersService.getOrders();
  }
}
