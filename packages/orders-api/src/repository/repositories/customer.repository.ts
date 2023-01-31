import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomerDTO } from 'src/customer/dtos/customer.dto';
import { Customer, CustomerDocument } from '../schemas/customer.schema';

export class CustomerRepository {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
  ) {}

  async create(customer: Customer): Promise<Customer> {
    const createdCustomer = new this.customerModel(customer);
    return createdCustomer.save();
  }

  async find(query, projection?): Promise<Customer[]> {
    return this.customerModel.find(query, projection);
  }

  async findById(customerId, projection?): Promise<Customer> {
    return this.customerModel.findById(customerId, projection);
  }

  async updateOne(customer): Promise<any> {
    const updatedCustomer = new this.customerModel(customer);
    return this.customerModel.updateOne(
      { _id: updatedCustomer._id },
      updatedCustomer,
    );
  }
}
