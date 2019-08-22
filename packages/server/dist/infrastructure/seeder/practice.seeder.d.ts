import { SeedReader } from './seed-reader';
import { Agency } from '../../domain/practices/agency';
import { Mechanism } from '../../domain/practices/mechanism';
import { Facility } from '../../domain/practices/facility';
import { IMechanismRepository } from '../../domain/practices/mechanism-repository.interface';
import { IAgencyRepository } from '../../domain/practices/agency-repository.interface';
import { IFacilityRepository } from '../../domain/practices/facility-repository.interface';
export declare class PracticeSeeder {
    private readonly reader;
    private readonly agencyRepository;
    private readonly mechanismRepository;
    private readonly facilityRepository;
    constructor(reader: SeedReader, agencyRepository: IAgencyRepository, mechanismRepository: IMechanismRepository, facilityRepository: IFacilityRepository);
    loadAgencies(): Promise<Agency[]>;
    loadFacilities(): Promise<Facility[]>;
    loadMechanisms(): Promise<Mechanism[]>;
    seed(): Promise<number>;
}
