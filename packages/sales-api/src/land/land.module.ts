import { Module } from '@nestjs/common';
import { LandController } from './controllers/land.controller';
import { RepositoryModule } from '../repository/repository.module';
import { LandService } from './services/land.service';
import { BatchService } from '../batch/services/batch.service';

@Module({
  controllers: [LandController],
  imports: [RepositoryModule],
  providers: [LandService, BatchService],
})
export class LandModule {}
