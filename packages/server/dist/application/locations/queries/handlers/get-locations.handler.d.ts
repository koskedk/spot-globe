import { IQueryHandler } from '@nestjs/cqrs';
import { GetLocationsQuery } from '../get-locations.query';
import { CountyDto } from '../../../../domain/locations/dtos/county.dto';
import { ILocationRepository } from '../../../../domain/locations/location-repository.interface';
export declare class GetLocationsHandler implements IQueryHandler<GetLocationsQuery, CountyDto[]> {
    private readonly repository;
    constructor(repository: ILocationRepository);
    execute(query: GetLocationsQuery): Promise<CountyDto[]>;
}
