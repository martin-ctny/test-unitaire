import { IsString, IsUUID } from 'class-validator';

export class SetOrderInvoicingAddressDto {
  @IsString()
  @IsUUID()
  orderId: string;

  @IsString()
  invoiceAddress: string;
}
