import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { SeederModule } from './infrastructure/seeder';
import { log } from 'util';
import { Logger } from '@nestjs/common';
import { fs } from 'fast-glob/out/utils';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  Logger.log(`starting in ${process.env.NODE_ENV} mode`);
  const microservice = app.connectMicroservice(config.QueueConfig);
  app.enableCors();
  const seeder = app.get(SeederModule);
  await seeder.seedData();
  await app.listen(config.Port);
  await app.startAllMicroservicesAsync().catch(e => Logger.error(e));
}

bootstrap();
