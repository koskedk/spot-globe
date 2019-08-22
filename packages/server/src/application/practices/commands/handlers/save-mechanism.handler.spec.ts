import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { SaveMechanismCommand } from '../save-mechanism.command';
import { CommandBus, CqrsModule } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { SaveMechanismHandler } from './save-mechanism.handler';
import { PracticesModule } from '../../practices.module';
import { TestDbHelper } from '../../../../../test/test-db.helper';
import { mechanismSchema } from '../../../../infrastructure/practices/schemas/mechanism.schema';
import { getTestAgencies, getTestMechanisms } from '../../../../../test/test.data';
import { Mechanism } from '../../../../domain/practices/mechanism';

describe('Save Mechanism Command Tests', () => {
  let module: TestingModule;
  let commandBus: CommandBus;
  let testMechanisms: Mechanism[] = [];
  const dbHelper = new TestDbHelper();
  let liveMechanism: Mechanism;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(dbHelper.url, dbHelper.options),
        MongooseModule.forFeature([{ name: 'Mechanism', schema: mechanismSchema }]),
        PracticesModule,
      ],
    }).compile();
    testMechanisms = getTestMechanisms(5);
    await dbHelper.initConnection();
    await dbHelper.seedDb('mechanisms', testMechanisms);

    const saveMechanismHandler = module.get<SaveMechanismHandler>(SaveMechanismHandler);

    commandBus = module.get<CommandBus>(CommandBus);
    commandBus.bind(saveMechanismHandler, SaveMechanismCommand.name);
  });

  afterAll(async () => {
    await dbHelper.clearDb();
    await dbHelper.closeConnection();
  });

  beforeEach(async () => {
    liveMechanism = new Mechanism('XXX', 'XXX-ZZX', 'IMP XXX', null);
    await dbHelper.seedDb('mechanisms', [liveMechanism]);
  });

  it('should create Mechanism', async () => {
    const command = new SaveMechanismCommand('Demo', 'Demo', 'Demo', null);
    const result = await commandBus.execute(command);
    expect(result).not.toBeNull();
    Logger.debug(result);
  });

  it('should modify Mechanism', async () => {
    const command = new SaveMechanismCommand('NewTest', 'NewTest', 'New Imp', null, liveMechanism._id);
    const result = await commandBus.execute(command);
    expect(result.code).toBe('NewTest');
    expect(result.name).toBe('NewTest');
    expect(result.implementationName).toBe('New Imp');
    expect(result._id).toBe(liveMechanism._id);
    Logger.debug(result);
  });

});
