import { IsString, IsUUID } from 'class-validator';

export class SetOrderShippingAddressDto {
  @IsString()
  @IsUUID()
  orderId: string;

  @IsString()
  shippingAddress: string;
}
