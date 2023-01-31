import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CustomerDTO } from '../dtos/customer.dto';
import { CustomerRepository } from '../../repository/repositories/customer.repository';
import { Address, Customer } from '../../repository/schemas/customer.schema';
const _ = require("lodash");  
import { exampleOfUtility } from '@promer/common-lib';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  /**
   * @name create
   * @param {object} customer Object customer to create
   * @description Creates a customer
   * @returns {Object} Returns the customer
   */
  async create(customer: CustomerDTO): Promise<any> {
    const customerExists = await this.customerRepository.find({email: customer.email},{
      _id: 1,
    })

    if(!_.isNil(customerExists[0]))
      throw new BadRequestException('Email already registered')
    
    const newAddress: Address = {
      country: customer.address.country,
      state: customer.address.state,
      city: customer.address.city,
      town: customer.address.town,
      street: customer.address.street,
      number: customer.address.number,
      zip: customer.address.zip
    }
    const newCustomer: Customer = {
      name: customer.name,
      lastName: customer.lastName,
      secondLastName: customer.secondLastName,
      email: customer.email,
      cellPhone: customer.cellPhone,
      phone: customer.phone,
      rfc: customer.rfc,
      facebook: customer.facebook,
      address: newAddress,
      birthday: new Date(customer.birthday),
      gender: customer.gender,
      avatar: customer.avatar,
      deleted: false,
      created_at: new Date(),
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
  async findById(customerId): Promise<any> {
    const customerFound = await this.customerRepository.findById(customerId);
    if(_.isNil(customerFound))
      throw new NotFoundException('User not found');
    if(customerFound.deleted)
      throw new NotFoundException('User not found');
    return customerFound;
  }


  /**
   * @name update
   * @param {Object} customer Object customer to update
   * @description Update the customer
   * @returns {Object} Returns the customer updated
   */
  async update(customer, customerId): Promise<any> {
    const customerFound = await this.customerRepository.findById(customerId, {
      _id: 1,
      deleted: 1,
    });
    if(_.isNil(customerFound))
      throw new NotFoundException('User not found');
    if(customerFound.deleted)
      throw new NotFoundException('User not found');
    customer._id = customerId
    return this.customerRepository.updateOne(customer);
  }

  
  /**
   * @name delete
   * @param {string} customerId Id from the customer
   * @description Deletes the customer but not remove from the DB
   * @returns {Object} Returns the result from the deletion
   */
  async delete(customerId): Promise<any> {
    const customer = await this.customerRepository.findById(customerId, {
      _id: 1,
      deleted: 1,
    });
    if(_.isNil(customer))
      throw new NotFoundException('User not found')
    if (customer.deleted)
      throw new BadRequestException('User already deleted' )
    customer.deleted = true;
    return this.customerRepository.updateOne(customer);
  }
}
