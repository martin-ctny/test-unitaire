import { IsArray, IsInt, IsNotEmpty, IsString } from 'class-validator';

class CreateOrderItemDto {
  @IsNotEmpty()
  @IsString()
  productName: string;

  @IsNotEmpty()
  @IsInt()
  quantity: number;

  @IsNotEmpty()
  @IsInt()
  price: number;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  customerName: string;

  @IsNotEmpty()
  @IsArray()
  orderItems: CreateOrderItemDto[];
}
