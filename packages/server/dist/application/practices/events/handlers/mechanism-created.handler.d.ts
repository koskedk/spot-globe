import { IEventHandler } from '@nestjs/cqrs';
import { MechanismCreatedEvent } from '../mechanism-created.event';
export declare class MechanismCreatedEventHandler implements IEventHandler<MechanismCreatedEvent> {
    handle(event: MechanismCreatedEvent): any;
}
