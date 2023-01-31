import { Body, Controller, Get, Patch, Post, Param, Delete } from '@nestjs/common';
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

  @Get('/:customerId')
  async findById(@Param('customerId') customerId): Promise<any> {
    return this.customerService.findById(customerId);
  }

  @Patch('/:customerId')
  async update(@Body() customer, @Param('customerId') customerId ): Promise<any> {
    return this.customerService.update(customer, customerId);
  }

  @Delete('/:customerId')
  async delete(@Param('customerId') customerId): Promise<any> {
    return this.customerService.delete(customerId);
  }
}
