import { EventsHandler, IEvent, IEventHandler } from '@nestjs/cqrs';
import { MechanismCreatedEvent } from '../mechanism-created.event';
import { Inject, Logger } from '@nestjs/common';
import { MechanismUpdatedEvent } from '../mechanism-updated.event';
import { ClientProxy } from '@nestjs/microservices';
import {
  IAgencyRepository,
  IMechanismRepository,
} from '../../../../domain/practices';
import { AgencyUpdatedEvent } from '../agency-updated.event';
import { ConfigService } from '../../../../config/config.service';
import { MessagingService } from '../../../../infrastructure/messging/messaging.service';
import { FacilityUpdatedEvent } from '../facility-updated.event';

@EventsHandler(MechanismUpdatedEvent)
export class MechanismUpdatedEventHandler
  implements IEventHandler<MechanismUpdatedEvent> {
  constructor(
    private readonly configService: ConfigService,
    private readonly messagingService: MessagingService,
    @Inject('IMechanismRepository')
    private readonly repository: IMechanismRepository,
  ) {}

  async handle(event: MechanismUpdatedEvent) {
    Logger.debug(`=== MechanismUpdated ===:${event._id}`);
    const mechanism = await this.repository.getById(event._id);
    const route = this.configService.QueueGlobeRoutes.find(c =>
      c.includes('practice'),
    );

    if (route && mechanism) {
      try {
        await this.messagingService.publish(
          { label: FacilityUpdatedEvent.name, body: mechanism },
          this.configService.QueueGlobeExchange,
          route,
        );
        Logger.debug(`*** MechanismUpdated Published ****:${event._id}`);
      } catch (e) {
        Logger.error(e);
      }
    }
  }
}
