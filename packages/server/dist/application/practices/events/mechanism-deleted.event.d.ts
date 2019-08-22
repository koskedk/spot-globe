import { IEvent } from '@nestjs/cqrs';
export declare class MechanismDeletedEvent implements IEvent {
    readonly _id: string;
    constructor(_id: string);
}
