import { Body, Controller, Post } from '@nestjs/common';
import { CustomerDTO } from '../dtos/customer.dto';
import { CustomerService } from '../services/customer.service';

@Controller()
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  /**
   * Creates a new customer
   */

  @Post()
  async create(@Body() customer: CustomerDTO): Promise<any> {
    return this.customerService.create(customer);
  }
}
