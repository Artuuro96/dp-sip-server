import { Injectable } from '@nestjs/common';
import { CustomerDTO } from '../dtos/customer.dto';
import { CustomerRepository } from '../repository/repositories/customer.repository';
import { Customer } from '../repository/schemas/customer.schema';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async create(customer: CustomerDTO): Promise<Customer> {
    return this.customerRepository.create(customer);
  }
}
