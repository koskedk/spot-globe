import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { SeederModule } from './infrastructure/seeder';
import { log } from 'util';
import { Logger } from '@nestjs/common';
import { fs } from "fast-glob/out/utils";
import { ConfigService } from "./config/config.service";
import { ConfigModule } from "./config/config.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config=app.get(ConfigService);
  const microservice = app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [config.QueueHost],
      queue: config.QueueName,
      queueOptions: { durable: true },
    },
  });
  app.enableCors();
  const seeder = app.get(SeederModule);
  await seeder.seedData();
  await app.listen(config.Port);
  await app.startAllMicroservicesAsync().catch(e => Logger.error(e));
}

bootstrap();
