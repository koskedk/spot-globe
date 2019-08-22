import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TestDbHelper } from '../../../test/test-db.helper';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationRepository } from './location.repository';
import { LocationsInfrastructureModule } from './locations.infrastructure.module';
import { ILocationRepository } from '../../domain/locations';
import { getTestPracticesCompleteData } from '../../../test/test.data';

describe('Location Repository Tests', () => {
  let module: TestingModule;
  let repository: ILocationRepository;
  const dbHelper = new TestDbHelper();
  const { counties } = getTestPracticesCompleteData();

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(dbHelper.url, dbHelper.options),
        LocationsInfrastructureModule,
      ],
    }).compile();

    await dbHelper.initConnection();
    await dbHelper.seedDb('counties', counties);
    repository = module.get<ILocationRepository>(`ILocationRepository`);
  });

  afterAll(async () => {
    await dbHelper.clearDb();
    await dbHelper.closeConnection();
  });

  it('should be defined', async () => {
    expect(repository).toBeDefined();
  });

  it('should load Counties', async () => {
    const testCounties = await repository.getAll();
    expect(testCounties.length).toBeGreaterThan(0);
    testCounties.map(c => Logger.log(c.name));
  });
});
