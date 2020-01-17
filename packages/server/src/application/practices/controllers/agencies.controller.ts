import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { GetAgenciesQuery } from '../queries';
import { AgencyDto } from '../../../domain/practices/dtos/agency.dto';
import { SaveAgencyCommand } from '../commands/save-agency.command';
import { DeleteAgencyCommand } from '../commands/delete-agency.command';
import { SyncDto } from '../../../domain/practices/dtos/sync.dto';
import { AgenciesSyncedEvent } from '../events/agencies-synced.event';

@Controller('agencies')
export class AgenciesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
  ) {}

  @Get()
  async getAgencies(): Promise<any> {
    return this.queryBus.execute(new GetAgenciesQuery());
  }

  @Post()
  async createOrUpdateAgency(@Body() agency: AgencyDto) {
    return this.commandBus.execute(
      new SaveAgencyCommand(agency.name, agency.display, agency._id),
    );
  }

  @Post('sync')
  async syncAgencies(@Body() agency: SyncDto) {
    return this.eventBus.publish(new AgenciesSyncedEvent(agency._ids));
    return 'Synced!';
  }

  @Delete(':id')
  async deleteAgency(@Param('id') id) {
    return this.commandBus.execute(new DeleteAgencyCommand(id));
  }
}
