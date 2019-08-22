import { Inject, Injectable, Logger } from '@nestjs/common';
import { SeedReader } from './seed-reader';
import { deserializeArray } from 'class-transformer';
import { County } from '../../domain/locations/county';
import { ILocationRepository } from '../../domain/locations/location-repository.interface';

@Injectable()
export class LocationSeeder {

  constructor(private readonly reader: SeedReader,
              @Inject('ILocationRepository')
              private readonly locationRepository: ILocationRepository) {
  }

  async load(): Promise<County[]> {
    const seedData = await this.reader.read(County.name.toLowerCase());
    const counties = deserializeArray(County, seedData);
    return counties;
  }

  async seed(): Promise<number> {
    const seedData = await this.load();
    const count = await this.locationRepository.getCount();
    if (count === 0) {
      Logger.log(`Seeding ${County.name}(s)...`);
      await this.locationRepository.createBatch(seedData);
      return seedData.length;
    }
    return 0;

  }

}
