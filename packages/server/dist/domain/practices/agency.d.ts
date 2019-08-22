import { AggregateRoot } from '@nestjs/cqrs';
import { Mechanism } from './mechanism';
export declare class Agency extends AggregateRoot {
    name: string;
    display: string;
    _id: string;
    mechanisms: any[];
    constructor(name: string, display: string);
    changeDetails(name: string, display: string): void;
    addMechanism(mechanism: Mechanism): void;
    toString(): string;
}
