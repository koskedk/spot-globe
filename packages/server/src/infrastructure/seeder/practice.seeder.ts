import { Inject, Injectable, Logger } from '@nestjs/common';
import { SeedReader } from './seed-reader';
import { deserializeArray } from 'class-transformer';
import { AgencyRepository } from '../practices/agency.repository';
import { Agency } from '../../domain/practices/agency';
import { MechanismRepository } from '../practices/mechanism.repository';
import { FacilityRepository } from '../practices/facility.repository';
import { Mechanism } from '../../domain/practices/mechanism';
import { Facility } from '../../domain/practices/facility';
import { IMechanismRepository } from '../../domain/practices/mechanism-repository.interface';
import { IAgencyRepository } from '../../domain/practices/agency-repository.interface';
import { IFacilityRepository } from '../../domain/practices/facility-repository.interface';

@Injectable()
export class PracticeSeeder {
  constructor(
    private readonly reader: SeedReader,
    @Inject('IAgencyRepository')
    private readonly agencyRepository: IAgencyRepository,
    @Inject('IMechanismRepository')
    private readonly mechanismRepository: IMechanismRepository,
    @Inject('IFacilityRepository')
    private readonly facilityRepository: IFacilityRepository,
  ) {}

  async loadAgencies(name?: string): Promise<Agency[]> {
    const seedData = await this.reader.read(
      name ? `${Agency.name.toLowerCase()}.${name}` : Agency.name.toLowerCase(),
    );
    const agencies = deserializeArray(Agency, seedData);
    return agencies;
  }

  async loadFacilities(name?: string): Promise<Facility[]> {
    const seedData = await this.reader.read(
      name
        ? `${Facility.name.toLowerCase()}.${name}`
        : Facility.name.toLowerCase(),
    );
    const facilities = deserializeArray(Facility, seedData);
    return facilities;
  }

  async loadMechanisms(name?: string): Promise<Mechanism[]> {
    const seedData = await this.reader.read(
      name
        ? `${Mechanism.name.toLowerCase()}.${name}`
        : Mechanism.name.toLowerCase(),
    );
    const mechanisms = deserializeArray(Mechanism, seedData);
    return mechanisms;
  }

  async seed(name?: string): Promise<number> {
    const agencies = await this.loadAgencies(name);
    const mechanisms = await this.loadMechanisms(name);
    const facilities = await this.loadFacilities(name);

    const ggenciesCount = await this.agencyRepository.getCount();
    if (ggenciesCount === 0) {
      Logger.log(`Seeding ${Agency.name}(s)...`);
      await this.agencyRepository.createBatch(agencies);
    }

    const mechanismsCount = await this.mechanismRepository.getCount();
    if (mechanismsCount === 0) {
      Logger.log(`Seeding ${Mechanism.name}(s)...`);
      await this.mechanismRepository.createBatch(mechanisms);
    }

    const facilitiesCount = await this.facilityRepository.getCount();
    if (facilitiesCount === 0) {
      Logger.log(`Seeding ${Facility.name}(s)..`);
      await this.facilityRepository.createBatch(facilities);
    }
    return 0;
  }
}
