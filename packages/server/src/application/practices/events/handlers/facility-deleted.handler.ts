import { EventsHandler, IEvent, IEventHandler } from '@nestjs/cqrs';
import { FacilityCreatedEvent } from '../facility-created.event';
import { Logger } from '@nestjs/common';
import { FacilityDeletedEvent } from '../facility-deleted.event';

@EventsHandler(FacilityDeletedEvent)
export class FacilityDeletedEventHandler implements IEventHandler<FacilityDeletedEvent> {
  handle(event: FacilityDeletedEvent): any {
    Logger.debug(`=== FacilityDeleted ===:${event._id}`);
  }
}
