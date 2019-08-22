import { IEventHandler } from '@nestjs/cqrs';
import { MechanismDeletedEvent } from '../mechanism-deleted.event';
export declare class MechanismDeletedEventHandler implements IEventHandler<MechanismDeletedEvent> {
    handle(event: MechanismDeletedEvent): any;
}
