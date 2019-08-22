import { Module } from '@nestjs/common';
import { SeedReader } from './seed-reader';
import { LocationSeeder } from './location.seeder';
import { PracticeSeeder } from './practice.seeder';
import { LocationsInfrastructureModule } from '../locations/locations.infrastructure.module';
import { PracticesInfrastructureModule } from '../practices/practices.infrastructure.module';

@Module({
  imports: [LocationsInfrastructureModule, PracticesInfrastructureModule],
  providers: [
    SeedReader, PracticeSeeder, LocationSeeder,
  ],
})
export class SeederModule {

  constructor(
    private readonly locationSeeder: LocationSeeder,
    private readonly practiceSeeder: PracticeSeeder) {
  }

  async seedData() {
    await this.locationSeeder.seed();
    await this.practiceSeeder.seed();
  }
}
