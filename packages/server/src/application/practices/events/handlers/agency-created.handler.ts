import { EventsHandler, IEvent, IEventHandler } from '@nestjs/cqrs';
import { AgencyCreatedEvent } from '../agency-created.event';
import { Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AgencyUpdatedEvent } from '../agency-updated.event';
import { IAgencyRepository } from '../../../../domain/practices/agency-repository.interface';

@EventsHandler(AgencyCreatedEvent)
export class AgencyCreatedEventHandler
  implements IEventHandler<AgencyCreatedEvent> {
  constructor(
    @Inject('GLOBE_SERVICE') private readonly client: ClientProxy,
    @Inject('IAgencyRepository')
    private readonly agencyRepository: IAgencyRepository,
  ) {}

  async handle(event: AgencyCreatedEvent) {
    /*
    this.client.send({cmd:AgencyCreatedEvent.name}, {}).
    */
    const pattern = {};
    Logger.debug(`=== AgencyCreated ===:${event._id}`);
    const agency = await this.agencyRepository.get(event._id);
    if (agency) {
      // await this.client.send({ cmd: AgencyCreatedEvent.name }, JSON.stringify(agency))
      //   .toPromise()
      //   .catch((err) => Logger.error(err));
      // Logger.debug(`*** AgencyCreated Published ****:${event._id}`);

      await this.client
        .emit(AgencyUpdatedEvent.name, JSON.stringify(agency))
        .toPromise()
        .catch(err => Logger.error(err));
      Logger.debug(`*** AgencyCreated Published ****:${event._id}`);
    }
  }
}
