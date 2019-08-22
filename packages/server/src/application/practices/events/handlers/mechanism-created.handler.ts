import { EventsHandler, IEvent, IEventHandler } from '@nestjs/cqrs';
import { MechanismCreatedEvent } from '../mechanism-created.event';
import { Logger } from '@nestjs/common';

@EventsHandler(MechanismCreatedEvent)
export class MechanismCreatedEventHandler implements IEventHandler<MechanismCreatedEvent> {
  handle(event: MechanismCreatedEvent): any {
    Logger.debug(`=== MechanismCreated ===:${event._id}`);
  }
}
