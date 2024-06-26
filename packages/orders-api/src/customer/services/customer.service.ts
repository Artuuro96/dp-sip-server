import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CustomerDTO } from '../dtos/customer.dto';
import { CustomerRepository } from '../../repository/repositories/customer.repository';
import { Address, Customer } from '../../repository/schemas/customer.schema';
import { isNil } from 'lodash';
import { PaginateResult } from '../../repository/interfaces/paginate-result.interface';


@Injectable()
export class CustomerService {
  constructor(private customerRepository: CustomerRepository) {}

  /**
   * @name create
   * @param {object} customer Object customer to create
   * @description Creates a customer
   * @returns {Object} Returns the customer
   */
  async create(customer: CustomerDTO): Promise<Customer> {
    const {address} = customer;
    const query = { email: customer.email }
    const projection = { _id: 1 }
    const customerExists = await this.customerRepository.find({query, projection})

    if(!isNil(customerExists[0]))
      throw new BadRequestException('Email already registered')
    
    const newAddress: Address = {
      ...address
    }
    
    const newCustomer: Customer = {
      ...customer,
      address: newAddress,
      birthday: new Date(customer.birthday),
      created_by: '63d8b7c773867f515b7b8adb' //Until we know how to get the userID
    }

    return this.customerRepository.create(newCustomer);
  }

  /**
   * @name findById
   * @param {string} customerId Id from the customer
   * @description Finds a customer with his ID
   * @returns {Object} Returns the customer found
   */
  async findById(customerId): Promise<Customer> {
    const customerFound = await this.customerRepository.findById(customerId);
    if(isNil(customerFound)) throw new NotFoundException('Customer not found');
    if(customerFound.deleted) throw new NotFoundException('Customer not found');
    return customerFound;
  }

  /**
   * @name findAll
   * @param {string} keyValue Value that we need to search
   * @param {number} skip Page of the paginate
   * @param  {number} limit Limit of the document result
   * @description Find all the customer paginated
   * @returns {PaginateResult} Object with the customer paginate
   */
  async findAll(keyValue: string = '', skip: number = 0, limit?: number): Promise<PaginateResult> {
    skip = Number(skip)
    limit = Number(limit)
    const options = {
      skip: skip > 0? skip - 1 : skip,
      limit
    }
    const query = {
        name: new RegExp(`${keyValue}`, 'i'),
    }

    const customers = await this.customerRepository.find({query, options})
    const countCustomers = await this.customerRepository.count(query)
    return {
      result: customers,
      total: countCustomers,
      page: skip,
      pages: Math.ceil(countCustomers/limit)
    }
  }


  /**
   * @name update
   * @param {Object} customer Object customer to update
   * @description Update the customer
   * @returns {Object} Returns the customer updated
   */
  async update(customer, customerId): Promise<Customer> {
    const customerFound = await this.customerRepository.findById(customerId, {
      _id: 1,
      deleted: 1,
    });
    if(isNil(customerFound))
      throw new NotFoundException('Customer not found');
    if(customerFound.deleted)
      throw new NotFoundException('Customer not found');
    customer._id = customerId
    return this.customerRepository.updateOne(customer);
  }

  
  /**
   * @name delete
   * @param {string} customerId Id from the customer
   * @description Deletes the customer but not remove from the DB
   * @returns {Object} Returns the result from the deletion
   */
  async delete(customerId): Promise<Customer> {
    const customer = await this.customerRepository.findById(customerId, {
      _id: 1,
      deleted: 1,
    });
    if(isNil(customer))
      throw new NotFoundException('Customer not found')
    if (customer.deleted)
      throw new BadRequestException('Customer already deleted' )
    customer.deleted = true;
    return this.customerRepository.updateOne(customer);
  }
}
