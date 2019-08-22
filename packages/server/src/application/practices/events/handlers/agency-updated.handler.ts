import { EventsHandler, IEvent, IEventHandler } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { AgencyUpdatedEvent } from '../agency-updated.event';
import { IAgencyRepository } from '../../../../domain/practices/agency-repository.interface';
import { ClientProxy } from '@nestjs/microservices';

@EventsHandler(AgencyUpdatedEvent)
export class AgencyUpdatedEventHandler
  implements IEventHandler<AgencyUpdatedEvent> {
  constructor(
    @Inject('GLOBE_SERVICE') private readonly client: ClientProxy,
    @Inject('IAgencyRepository')
    private readonly agencyRepository: IAgencyRepository,
  ) {}

  async handle(event: AgencyUpdatedEvent) {
    Logger.debug(`=== AgencyUpdated ===:${event._id}`);
    const agency = await this.agencyRepository.getById(event._id);
    if (agency) {
      await this.client
        .emit(AgencyUpdatedEvent.name, JSON.stringify(agency))
        .toPromise()
        .catch(err => Logger.error(err));
      Logger.debug(`*** AgencyUpdated Published ****:${event._id}`);
    }
  }
}
