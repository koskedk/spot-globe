import { IQueryHandler } from '@nestjs/cqrs';
import { GetAgenciesQuery } from '../get-agencies.query';
import { AgencyDto } from '../../../../domain/practices/dtos/agency.dto';
import { IAgencyRepository } from '../../../../domain/practices/agency-repository.interface';
export declare class GetAgenciesHandler implements IQueryHandler<GetAgenciesQuery, AgencyDto[]> {
    private readonly agencyRepository;
    constructor(agencyRepository: IAgencyRepository);
    execute(query: GetAgenciesQuery): Promise<AgencyDto[]>;
}
