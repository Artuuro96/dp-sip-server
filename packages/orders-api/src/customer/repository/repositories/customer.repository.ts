import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomerDTO } from 'src/customer/dtos/customer.dto';
import { Customer, CustomerDocument } from '../schemas/customer.schema';

export class CustomerRepository {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
  ) {}

  async create(customer: CustomerDTO): Promise<Customer> {
    const createdCustomer = new this.customerModel(customer);
    return createdCustomer.save();
  }
}
