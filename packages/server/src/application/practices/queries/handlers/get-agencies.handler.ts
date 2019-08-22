import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAgenciesQuery } from '../get-agencies.query';
import { AgencyDto } from '../../../../domain/practices/dtos/agency.dto';
import { deserializeArray, plainToClass } from 'class-transformer';
import { Agency } from '../../../../domain/practices/agency';
import { Inject } from '@nestjs/common';
import { IAgencyRepository } from '../../../../domain/practices/agency-repository.interface';

@QueryHandler(GetAgenciesQuery)
export class GetAgenciesHandler implements IQueryHandler<GetAgenciesQuery, AgencyDto[]> {
  constructor(
    @Inject('IAgencyRepository')
    private readonly agencyRepository: IAgencyRepository) {
  }

  async execute(query: GetAgenciesQuery): Promise<AgencyDto[]> {
    const results = await this.agencyRepository.getAll();
    return results;
  }
}
