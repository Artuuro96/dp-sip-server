import { Module } from '@nestjs/common';
import { LandModule } from './land/land.module';
import { BatchModule } from './batch/batch.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { Config } from './config/config.keys';

@Module({
  imports: [LandModule, BatchModule, ConfigModule],
  providers: [ConfigService],
})
export class AppModule {
  static port: number | string;

  constructor(private readonly configService: ConfigService) {
    AppModule.port = this.configService.get(Config.PORT);
  }
}
