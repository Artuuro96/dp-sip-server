import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LandRepository } from './repositories/land.repository';
import { BatchRepository } from './repositories/batch.repository';
import { Land, LandSchema } from './schemas/land.schema';
import { Batch, BatchSchema } from './schemas/batch.schema';

const schemas = [
  {
    name: Land.name,
    schema: LandSchema,
  },
  {
    name: Batch.name,
    schema: BatchSchema,
  },
];

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017'),
    MongooseModule.forFeature(schemas),
  ],
  exports: [BatchRepository, LandRepository],
  providers: [BatchRepository, LandRepository],
})
export class RepositoryModule {}
