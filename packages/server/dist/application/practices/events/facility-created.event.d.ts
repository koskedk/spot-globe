import { IEvent } from '@nestjs/cqrs';
export declare class FacilityCreatedEvent implements IEvent {
    readonly _id: string;
    constructor(_id: string);
}
