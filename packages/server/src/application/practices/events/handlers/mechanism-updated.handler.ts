import { EventsHandler, IEvent, IEventHandler } from '@nestjs/cqrs';
import { MechanismCreatedEvent } from '../mechanism-created.event';
import { Inject, Logger } from '@nestjs/common';
import { MechanismUpdatedEvent } from '../mechanism-updated.event';
import { ClientProxy } from '@nestjs/microservices';
import {
  IAgencyRepository,
  IMechanismRepository,
} from '../../../../domain/practices';
import { AgencyUpdatedEvent } from '../agency-updated.event';

@EventsHandler(MechanismUpdatedEvent)
export class MechanismUpdatedEventHandler
  implements IEventHandler<MechanismUpdatedEvent> {
  constructor(
    @Inject('GLOBE_SERVICE') private readonly client: ClientProxy,
    @Inject('IAgencyRepository')
    private readonly repository: IMechanismRepository,
  ) {}

  async handle(event: MechanismUpdatedEvent) {
    Logger.debug(`=== MechanismUpdated ===:${event._id}`);
    const agency = await this.repository.getById(event._id);
    if (agency) {
      await this.client
        .emit(MechanismUpdatedEvent.name, JSON.stringify(agency))
        .toPromise()
        .catch(err => Logger.error(err));
      Logger.debug(`*** MechanismUpdated Published ****:${event._id}`);
    }
  }
}
