import { EventsHandler, IEvent, IEventHandler } from '@nestjs/cqrs';
import { FacilityCreatedEvent } from '../facility-created.event';
import { Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  IAgencyRepository,
  IFacilityRepository,
} from '../../../../domain/practices';
import { AgencyUpdatedEvent } from '../agency-updated.event';

@EventsHandler(FacilityCreatedEvent)
export class FacilityCreatedEventHandler
  implements IEventHandler<FacilityCreatedEvent> {
  constructor(
    @Inject('GLOBE_SERVICE') private readonly client: ClientProxy,
    @Inject('IFacilityRepository')
    private readonly repository: IFacilityRepository,
  ) {}

  async handle(event: FacilityCreatedEvent) {
    Logger.debug(`=== FacilityCreated ===:${event._id}`);
    const agency = await this.repository.getById(event._id);
    if (agency) {
      await this.client
        .emit(FacilityCreatedEvent.name, JSON.stringify(agency))
        .toPromise()
        .catch(err => Logger.error(err));
      Logger.debug(`*** FacilityCreated Published ****:${event._id}`);
    }
  }
}
