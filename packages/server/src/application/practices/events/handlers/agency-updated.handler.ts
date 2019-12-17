import { EventsHandler, IEvent, IEventHandler } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { AgencyUpdatedEvent } from '../agency-updated.event';
import { IAgencyRepository } from '../../../../domain/practices/agency-repository.interface';
import { ClientProxy } from '@nestjs/microservices';
import { MessagingService } from '../../../../infrastructure/messging/messaging.service';
import { ConfigService } from '../../../../config/config.service';

@EventsHandler(AgencyUpdatedEvent)
export class AgencyUpdatedEventHandler
  implements IEventHandler<AgencyUpdatedEvent> {
  constructor(
    private readonly configService: ConfigService,
    private readonly messagingService: MessagingService,
    @Inject('IAgencyRepository')
    private readonly agencyRepository: IAgencyRepository,
  ) {}

  async handle(event: AgencyUpdatedEvent) {
    Logger.debug(`=== AgencyUpdated ===:${event._id}`);
    const agency = await this.agencyRepository.getById(event._id);
    const route = this.configService.QueueGlobeRoutes.find(c =>
      c.includes('practice'),
    );

    if (route && agency) {
      try {
        await this.messagingService.publish(
          { label: AgencyUpdatedEvent.name, body: agency },
          this.configService.QueueGlobeExchange,
          route,
        );
        Logger.debug(`*** AgencyUpdated Published ****:${event._id}`);
      } catch (e) {
        Logger.error(e);
      }
    }
  }
}
