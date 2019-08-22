import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { mechanismSchema } from '../../../../infrastructure/practices/schemas/mechanism.schema';
import { Logger } from '@nestjs/common';
import { PracticesModule } from '../../practices.module';
import { Mechanism } from '../../../../domain/practices/mechanism';
import { GetMechanismsQuery } from '../get-mechanisms.query';
import { GetMechanismsHandler } from './get-mechanisms.handler';
import { MechanismDto } from '../../../../domain/practices/dtos/mechanism.dto';
import { TestDbHelper } from '../../../../../test/test-db.helper';
import { getTestMechanisms } from '../../../../../test/test.data';
import { QueryBus } from '@nestjs/cqrs';

describe('Get Mechanism Query Tests', () => {
  let module: TestingModule;
  let queryBus: QueryBus;
  let testMechanisms: Mechanism[] = [];
  const dbHelper = new TestDbHelper();
  let liveMechanism: Mechanism;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(dbHelper.url, dbHelper.options),
        PracticesModule,
      ],
    }).compile();

    testMechanisms = getTestMechanisms(5);
    await dbHelper.initConnection();
    await dbHelper.seedDb('mechanisms', testMechanisms);

    const saveMechanismHandler = module.get<GetMechanismsHandler>(GetMechanismsHandler);

    queryBus = module.get<QueryBus>(QueryBus);
    queryBus.bind(saveMechanismHandler, GetMechanismsQuery.name);
  });

  afterAll(async () => {
    await dbHelper.clearDb();
    await dbHelper.closeConnection();
  });

  beforeEach(async () => {
    liveMechanism = new Mechanism('XXX', 'XXX-ZZX', 'IMP');
    await dbHelper.seedDb('mechanisms', [liveMechanism]);
  });

  it('should get new Mechanism', async () => {
    const query = new GetMechanismsQuery();
    const result = await queryBus.execute<GetMechanismsQuery, MechanismDto[]>(query);
    expect(result.length).toBeGreaterThan(0);
    result.forEach(c => Logger.debug(`${c}`));
  });
});
