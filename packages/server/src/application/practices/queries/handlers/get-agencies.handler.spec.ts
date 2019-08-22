import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { Logger } from '@nestjs/common';
import { PracticesModule } from '../../practices.module';
import { Agency } from '../../../../domain/practices/agency';
import { GetAgenciesQuery } from '../get-agencies.query';
import { GetAgenciesHandler } from './get-agencies.handler';
import { AgencyDto } from '../../../../domain/practices/dtos/agency.dto';
import { TestDbHelper } from '../../../../../test/test-db.helper';
import { getTestAgencies } from '../../../../../test/test.data';
import { QueryBus } from '@nestjs/cqrs';

describe('Get Agency Query Tests', () => {
  let module: TestingModule;
  let queryBus: QueryBus;
  let testAgencies: Agency[] = [];
  const dbHelper = new TestDbHelper();
  let liveAgency: Agency;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(dbHelper.url, dbHelper.options),
        PracticesModule,
      ],
    }).compile();

    testAgencies = getTestAgencies(5);
    await dbHelper.initConnection();
    await dbHelper.seedDb('agencies', testAgencies);

    const saveAgencyHandler = module.get<GetAgenciesHandler>(GetAgenciesHandler);

    queryBus = module.get<QueryBus>(QueryBus);
    queryBus.bind(saveAgencyHandler, GetAgenciesQuery.name);
  });

  afterAll(async () => {
    await dbHelper.clearDb();
    await dbHelper.closeConnection();
  });

  beforeEach(async () => {
    liveAgency = new Agency('XXX', 'XXX-ZZX');
    await dbHelper.seedDb('agencies', [liveAgency]);
  });

  it('should get new Agency', async () => {
    const query = new GetAgenciesQuery();
    const result = await queryBus.execute<GetAgenciesQuery, AgencyDto[]>(query);
    expect(result.length).toBeGreaterThan(0);
    result.forEach(c => Logger.debug(`${c}`));
  });
});
