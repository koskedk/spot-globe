import { EventsHandler, IEvent, IEventHandler } from '@nestjs/cqrs';
import { MechanismCreatedEvent } from '../mechanism-created.event';
import { Logger } from '@nestjs/common';
import { MechanismDeletedEvent } from '../mechanism-deleted.event';

@EventsHandler(MechanismDeletedEvent)
export class MechanismDeletedEventHandler implements IEventHandler<MechanismDeletedEvent> {
  handle(event: MechanismDeletedEvent): any {
    Logger.debug(`=== MechanismDeleted ===:${event._id}`);
  }
}
