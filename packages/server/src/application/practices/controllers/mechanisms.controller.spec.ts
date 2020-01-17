import { Test, TestingModule } from '@nestjs/testing';
import { PracticesModule } from '../practices.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { SaveMechanismHandler } from '../commands/handlers/save-mechanism.handler';
import { SaveMechanismCommand } from '../commands/save-mechanism.command';
import { TestDbHelper } from '../../../../test/test-db.helper';
import { Mechanism } from '../../../domain/practices/mechanism';
import { getTestMechanisms } from '../../../../test/test.data';
import { GetMechanismsQuery } from '../queries/get-mechanisms.query';
import { GetMechanismsHandler } from '../queries/handlers/get-mechanisms.handler';
import { MechanismDto } from '../../../domain/practices/dtos/mechanism.dto';
import { MechanismsController } from './mechanisms.controller';

describe('Mechanisms Controller Tests', () => {
  let module: TestingModule;
  let testMechanisms: Mechanism[] = [];
  const dbHelper = new TestDbHelper();
  let controller: MechanismsController;
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

    const saveMechanismHandler = module.get<SaveMechanismHandler>(
      SaveMechanismHandler,
    );
    const commandBus = module.get<CommandBus>(CommandBus);
    commandBus.bind(saveMechanismHandler, SaveMechanismCommand.name);

    const getMechanismsHandler = module.get<GetMechanismsHandler>(
      GetMechanismsHandler,
    );
    const queryBus = module.get<QueryBus>(QueryBus);
    queryBus.bind(getMechanismsHandler, GetMechanismsQuery.name);

    controller = new MechanismsController(
      commandBus,
      queryBus,
      module.get<EventBus>(EventBus),
    );
  });

  beforeEach(async () => {
    liveMechanism = new Mechanism('XXX', 'XXX-ZZX', 'IMP', null);
    await dbHelper.seedDb('mechanisms', [liveMechanism]);
  });

  it('should create Mechanism', async () => {
    const mechanismDto: MechanismDto = {
      code: 'Demo',
      name: 'Demo',
      implementationName: 'IMP',
      agency: null,
    };
    const result = await controller.createOrUpdateMechanism(mechanismDto);
    expect(result).not.toBeNull();
    Logger.debug(result);
  });

  it('should get All Mechanisms', async () => {
    const result = await controller.getMechanisms();
    expect(result.length).toBeGreaterThan(0);
    result.forEach(c => Logger.debug(`${c}`));
  });
});
