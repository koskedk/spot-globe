import { IEvent } from '@nestjs/cqrs';
export declare class AgencyUpdatedEvent implements IEvent {
    readonly _id: string;
    constructor(_id: string);
}
