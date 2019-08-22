import { AggregateRoot } from '@nestjs/cqrs';
export declare class County extends AggregateRoot {
    code: number;
    name: string;
    _id: string;
    constructor(code: number, name: string);
    toString(): string;
}
