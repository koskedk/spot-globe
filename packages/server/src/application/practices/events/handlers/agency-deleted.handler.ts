import { EventsHandler, IEvent, IEventHandler } from '@nestjs/cqrs';
import { AgencyCreatedEvent } from '../agency-created.event';
import { Logger } from '@nestjs/common';
import { AgencyDeletedEvent } from '../agency-deleted.event';

@EventsHandler(AgencyDeletedEvent)
export class AgencyDeletedEventHandler implements IEventHandler<AgencyDeletedEvent> {
  handle(event: AgencyDeletedEvent): any {
    Logger.debug(`=== AgencyDeleted ===:${event._id}`);
  }
}
