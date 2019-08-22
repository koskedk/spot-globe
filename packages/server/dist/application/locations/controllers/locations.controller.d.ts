import { QueryBus } from '@nestjs/cqrs';
export declare class LocationsController {
    private readonly queryBus;
    constructor(queryBus: QueryBus);
    getCounties(): Promise<any>;
}
