import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TestDbHelper } from '../../../test/test-db.helper';
import { MongooseModule } from '@nestjs/mongoose';
import { getTestPracticesCompleteData } from '../../../test/test.data';
import { PracticesInfrastructureModule } from './practices.infrastructure.module';
import { IMechanismRepository } from '../../domain/practices/mechanism-repository.interface';

describe('Mechanism Repository  Tests', () => {
  let module: TestingModule;
  let repository: IMechanismRepository;
  const dbHelper = new TestDbHelper();
  const {
    counties,
    agencies,
    facilities,
    mechanisms,
  } = getTestPracticesCompleteData();

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(dbHelper.url, dbHelper.options),
        PracticesInfrastructureModule,
      ],
    }).compile();

    await dbHelper.initConnection();
    await dbHelper.seedDb('counties', counties);
    await dbHelper.seedDb('agencies', agencies);
    await dbHelper.seedDb('mechanisms', mechanisms);
    await dbHelper.seedDb('facilities', facilities);
    repository = module.get<IMechanismRepository>(`IMechanismRepository`);
  });

  afterAll(async () => {
    await dbHelper.clearDb();
    await dbHelper.closeConnection();
  });

  it('should be defined', async () => {
    expect(repository).toBeDefined();
  });

  it('should load by Id', async () => {
    const fac = await repository.getById(mechanisms[0]._id);
    expect(fac.agency.name).not.toBeNull();
    expect(fac.facilities.length).toBeGreaterThan(0);
  });

  it('should load Mechanisms', async () => {
    const data = await repository.getMechanisms();
    expect(data.length).toBeGreaterThan(0);
  });

  it('should load Mechanisms by Agency', async () => {
    const data = await repository.getMechanisms(agencies[0]._id);
    expect(data.length).toBeGreaterThan(0);
  });
});
