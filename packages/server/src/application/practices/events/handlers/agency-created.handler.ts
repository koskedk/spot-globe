import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AgencyCreatedEvent } from '../agency-created.event';
import { Inject, Logger } from '@nestjs/common';
import { IAgencyRepository } from '../../../../domain/practices/agency-repository.interface';
import { MessagingService } from '../../../../infrastructure/messging/messaging.service';
import { AgencyUpdatedEvent } from '../agency-updated.event';
import { ConfigService } from '../../../../config/config.service';

@EventsHandler(AgencyCreatedEvent)
export class AgencyCreatedEventHandler
  implements IEventHandler<AgencyCreatedEvent> {
  constructor(
    private readonly configService: ConfigService,
    private readonly messagingService: MessagingService,
    @Inject('IAgencyRepository')
    private readonly agencyRepository: IAgencyRepository,
  ) {}

  async handle(event: AgencyCreatedEvent) {
    Logger.debug(`=== AgencyCreated ===:${event._id}`);
    const agency = await this.agencyRepository.getById(event._id);
    const route = this.configService.QueueGlobeRoutes.find(c =>
      c.includes('practice'),
    );

    if (route && agency) {
      try {
        await this.messagingService.publish(
          { label: AgencyCreatedEvent.name, body: agency },
          this.configService.QueueGlobeExchange,
          route,
        );
        Logger.debug(`*** AgencyCreated Published ****:${event._id}`);
      } catch (e) {
        Logger.error(e);
      }
    }
  }
}
