import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AgencyDto } from '../../../domain/practices/dtos/agency.dto';
export declare class AgenciesController {
    private readonly commandBus;
    private readonly queryBus;
    constructor(commandBus: CommandBus, queryBus: QueryBus);
    getAgencies(): Promise<any>;
    createOrUpdateAgency(agency: AgencyDto): Promise<any>;
    deleteAgency(id: any): Promise<any>;
}
