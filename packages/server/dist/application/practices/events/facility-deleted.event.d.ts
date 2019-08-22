import { IEvent } from '@nestjs/cqrs';
export declare class FacilityDeletedEvent implements IEvent {
    readonly _id: string;
    constructor(_id: string);
}
