import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LocationsController } from './controllers';
import { GetLocationsHandler } from './queries';
import { LocationsInfrastructureModule } from '../../infrastructure/locations';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([
      {
        name: 'GLOBE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://localhost:5672/spot`],
          queue: 'stats_queue',
          queueOptions: { durable: true },
        },
      },
    ]),
    LocationsInfrastructureModule,
  ],
  controllers: [LocationsController],
  providers: [GetLocationsHandler],
})
export class LocationsModule {}
