import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetFacilitiesQuery } from '../get-facilities.query';
import { FacilityDto } from '../../../../domain/practices/dtos/facility.dto';
import { Inject } from '@nestjs/common';
import { IFacilityRepository } from '../../../../domain/practices/facility-repository.interface';
import { GetFacilitiesCountQuery } from '../get-facilities-count.query';

@QueryHandler(GetFacilitiesCountQuery)
export class GetFacilitiesCountHandler
  implements IQueryHandler<GetFacilitiesCountQuery, number> {
  constructor(
    @Inject('IFacilityRepository')
    private readonly facilityRepository: IFacilityRepository,
  ) {}

  async execute(query: GetFacilitiesQuery): Promise<any> {
    const results = await this.facilityRepository.getCount();
    return results;
  }
}
