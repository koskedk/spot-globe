import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { LoggingInterceptor } from '../../common';
import { GetFacilitiesQuery } from '../queries';
import { FacilityDto } from '../../../domain/practices/dtos/facility.dto';
import { SaveFacilityCommand } from '../commands/save-facility.command';
import { DeleteFacilityCommand } from '../commands/delete-facility.command';
import { GetFacilitiesCountQuery } from '../queries/get-facilities-count.query';

@UseInterceptors(LoggingInterceptor)
@Controller('facilities')
export class FacilitiesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('/:size/:page')
  async getFacilities(
    @Query('sort') sort,
    @Query('filter') filter,
    @Param('size') size: number,
    @Param('page') page: number,
  ): Promise<any> {
    let sz = Number(size) || 20;
    let pg = Number(page) || 1;
    const query = new GetFacilitiesQuery(sz, pg);
    if (sort) {
      query.sort = sort;
    }
    if (filter) {
      query.filter = filter;
    }
    return this.queryBus.execute(query);
  }

  @Get('count')
  async getFacilitiesCount(): Promise<number> {
    return this.queryBus.execute(new GetFacilitiesCountQuery());
  }

  @Post()
  async createOrUpdateFacility(@Body() facility: FacilityDto) {
    return this.commandBus.execute(
      new SaveFacilityCommand(
        facility.code,
        facility.name,
        facility.county,
        facility.mechanism,
        facility._id,
      ),
    );
  }

  @Delete(':id')
  async deleteFacility(@Param('id') id) {
    return this.commandBus.execute(new DeleteFacilityCommand(id));
  }
}
