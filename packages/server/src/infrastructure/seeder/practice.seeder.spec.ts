import {  Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PracticeSeeder } from './practice.seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { TestDbHelper } from '../../../test/test-db.helper';
import { SeederModule } from './seeder.module';

describe('Practice Seeder Tests', () => {
  let module: TestingModule;
  let seeder: PracticeSeeder;
  const dbHelper = new TestDbHelper();

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        SeederModule,
        MongooseModule.forRoot(dbHelper.url, dbHelper.options),
      ],
    }).compile();

    await dbHelper.initConnection();
    seeder = module.get<PracticeSeeder>(PracticeSeeder);
  });

  afterAll(async () => {
    await dbHelper.clearDb();
    await dbHelper.closeConnection();
  });

  it('should load Agency Seed', async () => {
    const seeds = await seeder.loadAgencies();
    expect(seeds.length).toBeGreaterThan(0);
    seeds.forEach(s => Logger.debug(`${s.name} ${s} (${s._id})`));
  });

  it('should load Mechanism Seed', async () => {
    const seeds = await seeder.loadMechanisms();
    expect(seeds.length).toBeGreaterThan(0);
    seeds.forEach(s => Logger.debug(`${s.name} ${s} (${s._id})`));
  });

  it('should load Facility Seed', async () => {
    const seeds = await seeder.loadAgencies();
    expect(seeds.length).toBeGreaterThan(0);
    seeds.forEach(s => Logger.debug(`${s.name} ${s} (${s._id})`));
  });

  it('should seed', async () => {
    const seeds = await seeder.seed();
    expect(seeds).toBeGreaterThan(-1);
    Logger.debug(`Seeded: ${seeds}`);
  });
});
