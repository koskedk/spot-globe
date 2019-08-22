import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { SaveAgencyCommand } from '../save-agency.command';
import { CommandBus, CqrsModule } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { SaveAgencyHandler } from './save-agency.handler';
import { PracticesModule } from '../../practices.module';
import { TestDbHelper } from '../../../../../test/test-db.helper';
import { agencySchema } from '../../../../infrastructure/practices/schemas/agency.schema';
import { getTestAgencies } from '../../../../../test/test.data';
import { Agency } from '../../../../domain/practices/agency';

describe('Save Agency Command Tests', () => {
  let module: TestingModule;
  let commandBus: CommandBus;
  let testAgencies: Agency[] = [];
  const dbHelper = new TestDbHelper();
  let liveAgency: Agency;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(dbHelper.url, dbHelper.options),
        MongooseModule.forFeature([{ name: 'Agency', schema: agencySchema }]),
        PracticesModule,
      ],
    }).compile();
    testAgencies = getTestAgencies(5);
    await dbHelper.initConnection();
    await dbHelper.seedDb('agencies', testAgencies);

    const saveAgencyHandler = module.get<SaveAgencyHandler>(SaveAgencyHandler);

    commandBus = module.get<CommandBus>(CommandBus);
    commandBus.bind(saveAgencyHandler, SaveAgencyCommand.name);
  });

  afterAll(async () => {
    await dbHelper.clearDb();
    await dbHelper.closeConnection();
  });

  beforeEach(async () => {
    liveAgency = new Agency('XXX', 'XXX-ZZX');
    await dbHelper.seedDb('agencies', [liveAgency]);
  });

  it( 'should create Agency', async () => {
    const command = new SaveAgencyCommand('Demo', 'Demo');
    const result = await commandBus.execute(command);
    expect(result).not.toBeNull();
    Logger.debug(result);
  });

  it('should modify Agency', async () => {
    const command = new SaveAgencyCommand('NewTest', 'NewTest', liveAgency._id);
    const result = await commandBus.execute(command);
    expect(result.name).toBe('NewTest');
    expect(result.display).toBe('NewTest');
    expect(result._id).toBe(liveAgency._id);
    Logger.debug(result);
  });

});
