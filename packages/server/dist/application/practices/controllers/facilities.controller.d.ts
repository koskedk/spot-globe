import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FacilityDto } from '../../../domain/practices/dtos/facility.dto';
export declare class FacilitiesController {
    private readonly commandBus;
    private readonly queryBus;
    constructor(commandBus: CommandBus, queryBus: QueryBus);
    getFacilities(): Promise<any>;
    createOrUpdateFacility(facility: FacilityDto): Promise<any>;
    deleteFacility(id: any): Promise<any>;
}
