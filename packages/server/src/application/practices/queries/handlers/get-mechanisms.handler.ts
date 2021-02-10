import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMechanismsQuery } from '../get-mechanisms.query';
import { MechanismDto } from '../../../../domain/practices/dtos/mechanism.dto';
import { Inject } from '@nestjs/common';
import { IMechanismRepository } from '../../../../domain/practices/mechanism-repository.interface';

@QueryHandler(GetMechanismsQuery)
export class GetMechanismsHandler implements IQueryHandler<GetMechanismsQuery, MechanismDto[]> {
  constructor(
      @Inject('IMechanismRepository')
      private readonly mechanismRepository: IMechanismRepository) {
  }

  async execute(query: GetMechanismsQuery): Promise<any> {
    let results = [];
    if (query.name) {
      results = await this.mechanismRepository.getMechanismsByName(query.name);
    } else {
      results = await this.mechanismRepository.getAll();
    }
    return results;
  }
}
