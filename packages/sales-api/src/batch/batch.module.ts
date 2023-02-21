import { Module } from '@nestjs/common';
import { BatchController } from './controllers/batch.controller';
import { RepositoryModule } from '../repository/repository.module';
import { BatchService } from './services/batch.service';
import { LandService } from '../land/services/land.service';

@Module({
  controllers: [BatchController],
  imports: [RepositoryModule],
  providers: [LandService, BatchService],
})
export class BatchModule {}
