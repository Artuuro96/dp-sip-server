import { Injectable } from '@nestjs/common';
import { CustomerDTO } from '../dtos/customer.dto';
import { CustomerRepository } from '../repository/repositories/customer.repository';
import { Customer } from '../repository/schemas/customer.schema';
import { exampleOfUtility } from '@promer/common-lib';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async create(customer: CustomerDTO): Promise<Customer> {
    const example = exampleOfUtility(1, 2);
    console.log(example);
    return this.customerRepository.create(customer);
  }
}
