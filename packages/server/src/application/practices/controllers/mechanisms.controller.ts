import {Body, Controller, Delete, Get, Param, Post, Query} from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { GetMechanismsQuery } from '../queries';
import { MechanismDto } from '../../../domain/practices/dtos/mechanism.dto';
import { SaveMechanismCommand } from '../commands/save-mechanism.command';
import { DeleteMechanismCommand } from '../commands/delete-mechanism.command';
import { SyncDto } from '../../../domain/practices/dtos/sync.dto';
import { AgenciesSyncedEvent } from '../events/agencies-synced.event';
import { MechanismsSyncedEvent } from '../events/mechanisms-synced.event';

@Controller('mechanisms')
export class MechanismsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
  ) {}

  @Get()
  async getMechanisms(): Promise<any> {
    return this.queryBus.execute(new GetMechanismsQuery());
  }

  @Get('search')
  async getMechanismsByName(@Query('name') name): Promise<any> {
    return this.queryBus.execute(new GetMechanismsQuery(name));
  }

  @Post()
  async createOrUpdateMechanism(@Body() mechanism: MechanismDto) {
    return this.commandBus.execute(
      new SaveMechanismCommand(
        mechanism.code,
        mechanism.name,
        mechanism.implementationName,
        mechanism.agency,
        mechanism._id,
      ),
    );
  }

  @Delete(':id')
  async deleteMechanism(@Param('id') id) {
    return this.commandBus.execute(new DeleteMechanismCommand(id));
  }

  @Post('sync')
  async syncMechanisms(@Body() mechanisms: SyncDto) {
    return this.eventBus.publish(new MechanismsSyncedEvent(mechanisms._ids));
    return 'Synced!';
  }
}
