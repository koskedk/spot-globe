import { IEventHandler } from '@nestjs/cqrs';
import { FacilityDeletedEvent } from '../facility-deleted.event';
export declare class FacilityDeletedEventHandler implements IEventHandler<FacilityDeletedEvent> {
    handle(event: FacilityDeletedEvent): any;
}
