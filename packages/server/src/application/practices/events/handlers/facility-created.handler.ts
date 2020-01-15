import { EventsHandler, IEvent, IEventHandler } from '@nestjs/cqrs';
import { FacilityCreatedEvent } from '../facility-created.event';
import { Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  IAgencyRepository,
  IFacilityRepository,
} from '../../../../domain/practices';
import { AgencyUpdatedEvent } from '../agency-updated.event';
import { MessagingService } from '../../../../infrastructure/messging/messaging.service';
import { ConfigService } from '../../../../config/config.service';

@EventsHandler(FacilityCreatedEvent)
export class FacilityCreatedEventHandler
  implements IEventHandler<FacilityCreatedEvent> {
  constructor(
    private readonly configService: ConfigService,
    private readonly messagingService: MessagingService,
    @Inject('IFacilityRepository')
    private readonly repository: IFacilityRepository,
  ) {}

  async handle(event: FacilityCreatedEvent) {
    Logger.debug(`=== FacilityCreated ===:${event._id}`);
    const facility = await this.repository.getById(event._id);
    const route = this.configService.QueueGlobeRoutes.find(c =>
      c.includes('practice'),
    );

    if (route && facility) {
      try {
        await this.messagingService.publish(
          { label: FacilityCreatedEvent.name, body: facility },
          this.configService.QueueGlobeExchange,
          route,
        );
        Logger.debug(`*** FacilityUpdated Published ****:${event._id}`);
      } catch (e) {
        Logger.error(e);
      }
    }
  }
}
