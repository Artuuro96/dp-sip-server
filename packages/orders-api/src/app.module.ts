import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { Config } from './config/config.keys';

@Module({
  imports: [CustomerModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {
  static port: number | string;

  constructor(private readonly configService: ConfigService) {
    AppModule.port = this.configService.get(Config.PORT);
  }
}
