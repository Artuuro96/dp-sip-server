import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CustomerDocument = HydratedDocument<Customer>;

@Schema()
export class Customer {
  @Prop()
  name: string;

  @Prop()
  lastName: string;

  @Prop()
  secondLastName: string;

  @Prop()
  email: string;

  @Prop()
  cellPhone: string;

  @Prop()
  phone: string;

  @Prop()
  rfc: string;

  @Prop()
  address1: string;

  @Prop()
  address2: string;

  @Prop()
  birthday: string;

  @Prop()
  gender: string;

  @Prop()
  avatar: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
