import { IEvent } from '@nestjs/cqrs';
export declare class AgencyCreatedEvent implements IEvent {
    readonly _id: string;
    constructor(_id: string);
}
