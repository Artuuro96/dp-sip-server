import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerRepository } from './repositories/customer.repository';
import { Customer, CustomerSchema } from './schemas/customer.schema';

const schemas = [
  {
    name: Customer.name,
    schema: CustomerSchema,
  },
];

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017'),
    MongooseModule.forFeature(schemas),
  ],
  exports: [CustomerRepository],
  providers: [CustomerRepository],
})
export class RepositoryModule {}
