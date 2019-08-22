import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { SeederModule } from './infrastructure/seeder';
import { log } from 'util';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const microservice = app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://localhost:5672/spot`],
      queue: 'stats_queue',
      queueOptions: { durable: true },
    },
  });
  app.enableCors();
  const seeder = app.get(SeederModule);
  await seeder.seedData();
  await app.listen(4710);
  await app.startAllMicroservicesAsync().catch(e => Logger.error(e));
}

bootstrap();
