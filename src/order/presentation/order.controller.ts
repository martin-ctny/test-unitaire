import { Body, Controller, Get, Post } from '@nestjs/common';
import { Order } from '../domain/entity/order.entity';
import { CreateOrderService } from '../domain/use-case/create-order.service';
import { CreateOrderDto } from '../domain/dto/create-order.dto';
import { GetOrdersService } from '../domain/use-case/get-orders.service';

@Controller('/orders')
export default class OrderController {
  constructor(
    private readonly createOrderService: CreateOrderService,
    private readonly getOrdersService: GetOrdersService,
  ) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.createOrderService.createOrder(createOrderDto);
  }

  // @Get()
  // async getOrders(): Promise<Order[]> {
  //   return this.getOrdersService.getOrders();
  // }
}
