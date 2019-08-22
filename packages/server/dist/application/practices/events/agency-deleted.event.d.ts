import { IEvent } from '@nestjs/cqrs';
export declare class AgencyDeletedEvent implements IEvent {
    readonly _id: string;
    constructor(_id: string);
}
