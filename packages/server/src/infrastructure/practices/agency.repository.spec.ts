import { Test, TestingModule } from '@nestjs/testing';
import { TestDbHelper } from '../../../test/test-db.helper';
import { MongooseModule } from '@nestjs/mongoose';
import { IAgencyRepository } from '../../domain/practices';
import { PracticesInfrastructureModule } from './practices.infrastructure.module';
import { Logger } from '@nestjs/common';
import { getTestPracticesCompleteData } from '../../../test/test.data';

describe('Agency Repository  Tests', () => {
  let module: TestingModule;
  let repository: IAgencyRepository;
  const dbHelper = new TestDbHelper();
  const { agencies, mechanisms } = getTestPracticesCompleteData();

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(dbHelper.url, dbHelper.options),
        PracticesInfrastructureModule,
      ],
    }).compile();

    await dbHelper.initConnection();
    await dbHelper.seedDb('agencies', agencies);
    await dbHelper.seedDb('mechanisms', mechanisms);
    repository = module.get<IAgencyRepository>('IAgencyRepository');
  });

  afterAll(async () => {
    await dbHelper.clearDb();
    await dbHelper.closeConnection();
  });

  it('should be defined', async () => {
    expect(repository).toBeDefined();
  });

  it('should load By Id', async () => {
    const data = await repository.getById(agencies[0]._id);
    expect(data).not.toBeNull();
    Logger.log(data);
  });
});
