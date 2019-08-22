import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PracticesInfrastructureModule } from '../../infrastructure/practices';
import {
  AgencyCreatedEventHandler,
  AgencyDeletedEventHandler,
  AgencyUpdatedEventHandler,
  FacilityCreatedEventHandler,
  FacilityDeletedEventHandler,
  FacilityUpdatedEventHandler,
  MechanismCreatedEventHandler,
  MechanismDeletedEventHandler,
  MechanismUpdatedEventHandler,
} from './events';
import {
  AgenciesController,
  FacilitiesController,
  MechanismsController,
} from './controllers';
import { SaveAgencyHandler } from './commands/handlers/save-agency.handler';
import { DeleteFacilityHandler } from './commands/handlers/delete-facility.handler';
import { SaveFacilityHandler } from './commands/handlers/save-facility.handler';
import {
  GetAgenciesHandler,
  GetFacilitiesHandler,
  GetMechanismsHandler,
} from './queries';
import { DeleteAgencyHandler } from './commands/handlers/delete-agency.handler';
import { SaveMechanismHandler } from './commands/handlers/save-mechanism.handler';
import { DeleteMechanismHandler } from './commands/handlers/delete-mechanism.handler';

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
    PracticesInfrastructureModule,
  ],
  controllers: [AgenciesController, FacilitiesController, MechanismsController],
  providers: [
    SaveAgencyHandler,
    DeleteAgencyHandler,
    SaveFacilityHandler,
    DeleteFacilityHandler,
    SaveMechanismHandler,
    DeleteMechanismHandler,
    GetAgenciesHandler,
    GetMechanismsHandler,
    GetFacilitiesHandler,
    AgencyCreatedEventHandler,
    AgencyDeletedEventHandler,
    AgencyUpdatedEventHandler,
    FacilityCreatedEventHandler,
    FacilityDeletedEventHandler,
    FacilityUpdatedEventHandler,
    MechanismCreatedEventHandler,
    MechanismDeletedEventHandler,
    MechanismUpdatedEventHandler,
  ],
})
export class PracticesModule {}
