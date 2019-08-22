import { IEvent } from '@nestjs/cqrs';
export declare class MechanismCreatedEvent implements IEvent {
    readonly _id: string;
    constructor(_id: string);
}
