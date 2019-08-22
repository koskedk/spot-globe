import { EventsHandler, IEvent, IEventHandler } from '@nestjs/cqrs';
import { FacilityCreatedEvent } from '../facility-created.event';
import { Inject, Logger } from '@nestjs/common';
import { FacilityUpdatedEvent } from '../facility-updated.event';
import { ClientProxy } from '@nestjs/microservices';
import {
  IAgencyRepository,
  IFacilityRepository,
} from '../../../../domain/practices';
import { AgencyUpdatedEvent } from '../agency-updated.event';

@EventsHandler(FacilityUpdatedEvent)
export class FacilityUpdatedEventHandler
  implements IEventHandler<FacilityUpdatedEvent> {
  constructor(
    @Inject('GLOBE_SERVICE') private readonly client: ClientProxy,
    @Inject('IFacilityRepository')
    private readonly repository: IFacilityRepository,
  ) {}

  async handle(event: FacilityUpdatedEvent) {
    Logger.debug(`=== FacilityUpdated ===:${event._id}`);
    const agency = await this.repository.getById(event._id);
    if (agency) {
      await this.client
        .emit(AgencyUpdatedEvent.name, JSON.stringify(agency))
        .toPromise()
        .catch(err => Logger.error(err));
      Logger.debug(`*** FacilityUpdated Published ****:${event._id}`);
    }
  }
}
