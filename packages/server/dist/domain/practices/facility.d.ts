import { AggregateRoot } from '@nestjs/cqrs';
export declare class Facility extends AggregateRoot {
    code: number;
    name: string;
    county?: string;
    mechanism?: string;
    _id: string;
    constructor(code: number, name: string, county?: string, mechanism?: string);
    changeDetails(code: number, name: string, county?: string, mechanismId?: string): void;
}
