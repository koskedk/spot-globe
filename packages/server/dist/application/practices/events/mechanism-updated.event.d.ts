import { IEvent } from '@nestjs/cqrs';
export declare class MechanismUpdatedEvent implements IEvent {
    readonly _id: string;
    constructor(_id: string);
}
