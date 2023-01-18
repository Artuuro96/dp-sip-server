import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerRepository } from './repositories/customer.repository';
import { Customer, CustomerSchema } from './schemas/customer.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://admin:pass@localhost:27017/promer'),
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),
  ],
  exports: [CustomerRepository],
  providers: [CustomerRepository],
})
export class RepositoryModule {}
