import { IQueryHandler } from '@nestjs/cqrs';
import { GetFacilitiesQuery } from '../get-facilities.query';
import { FacilityDto } from '../../../../domain/practices/dtos/facility.dto';
import { IFacilityRepository } from '../../../../domain/practices/facility-repository.interface';
export declare class GetFacilitiesHandler implements IQueryHandler<GetFacilitiesQuery, FacilityDto[]> {
    private readonly facilityRepository;
    constructor(facilityRepository: IFacilityRepository);
    execute(query: GetFacilitiesQuery): Promise<any>;
}
