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

  constructor(private readonly reader: SeedReader,
              @Inject('IAgencyRepository')
              private readonly agencyRepository: IAgencyRepository,
              @Inject('IMechanismRepository')
              private readonly mechanismRepository: IMechanismRepository,
              @Inject('IFacilityRepository')
              private readonly facilityRepository: IFacilityRepository) {
  }

  async loadAgencies(): Promise<Agency[]> {
    const seedData = await this.reader.read(Agency.name.toLowerCase());
    const agencies = deserializeArray(Agency, seedData);
    return agencies;
  }

  async loadFacilities(): Promise<Facility[]> {
    const seedData = await this.reader.read(Facility.name.toLowerCase());
    const facilities = deserializeArray(Facility, seedData);
    return facilities;
  }

  async loadMechanisms(): Promise<Mechanism[]> {
    const seedData = await this.reader.read(Mechanism.name.toLowerCase());
    const mechanisms = deserializeArray(Mechanism, seedData);
    return mechanisms;
  }

  async seed(): Promise<number> {

    const agencies = await this.loadAgencies();
    const mechanisms = await this.loadMechanisms();
    const facilities = await this.loadFacilities();

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
