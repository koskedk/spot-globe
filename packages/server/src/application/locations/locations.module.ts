import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LocationsController } from './controllers';
import { GetLocationsHandler } from './queries';
import { LocationsInfrastructureModule } from '../../infrastructure/locations';
import { MessagingModule } from '../../infrastructure/messging/messaging.module';

@Module({
  imports: [CqrsModule, LocationsInfrastructureModule],
  controllers: [LocationsController],
  providers: [GetLocationsHandler],
})
export class LocationsModule {}
