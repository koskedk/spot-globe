import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
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
import { ConfigModule } from '../../config/config.module';
import { MessagingModule } from '../../infrastructure/messging/messaging.module';
import { GetFacilitiesCountHandler } from './queries/handlers/get-facilities-count.handler';
import { AgenciesSyncedEventHandler } from './events/handlers/agencies-synced.handler';
import { FacilitiesSyncedEventHandler } from './events/handlers/facilities-synced.handler';
import { MechanismsSyncedEventHandler } from './events/handlers/mechanisms-synced.handler';
import { AllFacilitiesSyncedEventHandler } from './events/handlers/all-facilities-synced.handler';

@Module({
  imports: [
    CqrsModule,
    PracticesInfrastructureModule,
    ConfigModule,
    MessagingModule,
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
    GetFacilitiesCountHandler,
    AgencyCreatedEventHandler,
    AgencyDeletedEventHandler,
    AgencyUpdatedEventHandler,
    AgenciesSyncedEventHandler,
    FacilityCreatedEventHandler,
    FacilityDeletedEventHandler,
    FacilityUpdatedEventHandler,
    FacilitiesSyncedEventHandler,
    AllFacilitiesSyncedEventHandler,
    MechanismCreatedEventHandler,
    MechanismDeletedEventHandler,
    MechanismUpdatedEventHandler,
    MechanismsSyncedEventHandler,
  ],
})
export class PracticesModule {}
