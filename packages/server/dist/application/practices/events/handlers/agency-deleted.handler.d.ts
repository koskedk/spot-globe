import { IEventHandler } from '@nestjs/cqrs';
import { AgencyDeletedEvent } from '../agency-deleted.event';
export declare class AgencyDeletedEventHandler implements IEventHandler<AgencyDeletedEvent> {
    handle(event: AgencyDeletedEvent): any;
}
