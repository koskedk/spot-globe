import { Inject, Injectable, Logger } from '@nestjs/common';
import { SeedReader } from './seed-reader';
import { deserializeArray } from 'class-transformer';
import { County } from '../../domain/locations/county';
import { ILocationRepository } from '../../domain/locations/location-repository.interface';
import { Agency } from '../../domain/practices';

@Injectable()
export class LocationSeeder {
  constructor(
    private readonly reader: SeedReader,
    @Inject('ILocationRepository')
    private readonly locationRepository: ILocationRepository,
  ) {}

  async load(name?: string): Promise<County[]> {
    const seedData = await this.reader.read(
      name ? `${County.name.toLowerCase()}.${name}` : County.name.toLowerCase(),
    );
    const counties = deserializeArray(County, seedData);
    return counties;
  }

  async seed(name?: string): Promise<number> {
    const seedData = await this.load(name);
    const count = await this.locationRepository.getCount();
    if (count === 0) {
      Logger.log(`Seeding ${County.name}(s)...`);
      await this.locationRepository.createBatch(seedData);
      return seedData.length;
    }
    return 0;
  }
}
