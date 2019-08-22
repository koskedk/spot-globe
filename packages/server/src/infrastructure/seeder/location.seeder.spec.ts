import {  Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { LocationSeeder } from './location.seeder';
import { TestDbHelper } from '../../../test/test-db.helper';
import { MongooseModule } from '@nestjs/mongoose';
import { countySchema } from '../locations/schemas/county.schema';
import { SeederModule } from './seeder.module';

describe('Location Seeder Tests', () => {
  let module: TestingModule;
  let seeder: LocationSeeder;
  const dbHelper = new TestDbHelper();

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        SeederModule,
        MongooseModule.forRoot(dbHelper.url, dbHelper.options),
      ],
    }).compile();

    await dbHelper.initConnection();
    seeder = module.get<LocationSeeder>(LocationSeeder);
  });

  afterAll(async () => {
    await dbHelper.clearDb();
    await dbHelper.closeConnection();
  });

  it('should load County Seed', async () => {
    const seeds = await seeder.load();
    expect(seeds.length).toBeGreaterThan(-1);
    seeds.forEach(s => Logger.debug(`${s.code} ${s} (${s._id})`));
  });
});
