import { IQueryHandler } from '@nestjs/cqrs';
import { GetMechanismsQuery } from '../get-mechanisms.query';
import { MechanismDto } from '../../../../domain/practices/dtos/mechanism.dto';
import { IMechanismRepository } from '../../../../domain/practices/mechanism-repository.interface';
export declare class GetMechanismsHandler implements IQueryHandler<GetMechanismsQuery, MechanismDto[]> {
    private readonly mechanismRepository;
    constructor(mechanismRepository: IMechanismRepository);
    execute(query: GetMechanismsQuery): Promise<any>;
}
