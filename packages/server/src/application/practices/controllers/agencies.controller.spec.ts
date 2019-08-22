import { Test, TestingModule } from '@nestjs/testing';
import { AgenciesController } from './agencies.controller';
import { PracticesModule } from '../practices.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { SaveAgencyHandler } from '../commands/handlers/save-agency.handler';
import { SaveAgencyCommand } from '../commands/save-agency.command';
import { TestDbHelper } from '../../../../test/test-db.helper';
import { Agency } from '../../../domain/practices/agency';
import { getTestAgencies } from '../../../../test/test.data';
import { GetAgenciesQuery } from '../queries/get-agencies.query';
import { GetAgenciesHandler } from '../queries/handlers/get-agencies.handler';

describe('Practices Controller Tests', () => {
  let module: TestingModule;
  let testAgencies: Agency[] = [];
  const dbHelper = new TestDbHelper();
  let controller: AgenciesController;
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

    const saveAgencyHandler = module.get<SaveAgencyHandler>(SaveAgencyHandler);
    const commandBus = module.get<CommandBus>(CommandBus);
    commandBus.bind(saveAgencyHandler, SaveAgencyCommand.name);

    const getAgenciesHandler = module.get<GetAgenciesHandler>(GetAgenciesHandler);
    const queryBus = module.get<QueryBus>(QueryBus);
    queryBus.bind(getAgenciesHandler, GetAgenciesQuery.name);

    controller = new AgenciesController(commandBus, queryBus);
  });

  beforeEach(async () => {
    liveAgency = new Agency('XXX', 'XXX-ZZX');
    await dbHelper.seedDb('agencies', [liveAgency]);
  });

  it('should create Agency', async () => {
    const command = new SaveAgencyCommand('Demo', 'Demo');
    const result = await controller.createOrUpdateAgency(command);
    expect(result).not.toBeNull();
    Logger.debug(result);
  });

  it('should get All Agencies', async () => {
    const result = await controller.getAgencies();
    expect(result.length).toBeGreaterThan(0);
    result.forEach(c => Logger.debug(`${c}`));
  });
});
