import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetLocationsQuery } from '../get-locations.query';
import { CountyDto } from '../../../../domain/locations/dtos/county.dto';
import { ILocationRepository } from '../../../../domain/locations/location-repository.interface';

@QueryHandler(GetLocationsQuery)
export class GetLocationsHandler
  implements IQueryHandler<GetLocationsQuery, CountyDto[]> {
  constructor(
    @Inject('ILocationRepository')
    private readonly repository: ILocationRepository,
  ) {}

  async execute(query: GetLocationsQuery): Promise<CountyDto[]> {
    return await this.repository.getAll();
  }
}
