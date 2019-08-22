import { AggregateRoot } from '@nestjs/cqrs';
import { Facility } from './facility';
export declare class Mechanism extends AggregateRoot {
    code: string;
    name: string;
    implementationName: string;
    agency?: string;
    _id: string;
    facilities: any[];
    constructor(code: string, name: string, implementationName: string, agency?: string);
    changeDetails(code: string, name: string, implementationName: string, agency?: string): void;
    addFacility(facility: Facility): void;
}
