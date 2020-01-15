import { EventsHandler, IEvent, IEventHandler } from '@nestjs/cqrs';
import { MechanismCreatedEvent } from '../mechanism-created.event';
import { Inject, Logger } from '@nestjs/common';
import { ConfigService } from '../../../../config/config.service';
import { MessagingService } from '../../../../infrastructure/messging/messaging.service';
import {
  IFacilityRepository,
  IMechanismRepository,
} from '../../../../domain/practices';
import { FacilityUpdatedEvent } from '../facility-updated.event';

@EventsHandler(MechanismCreatedEvent)
export class MechanismCreatedEventHandler
  implements IEventHandler<MechanismCreatedEvent> {
  constructor(
    private readonly configService: ConfigService,
    private readonly messagingService: MessagingService,
    @Inject('IMechanismRepository')
    private readonly repository: IMechanismRepository,
  ) {}

  async handle(event: MechanismCreatedEvent) {
    Logger.debug(`=== MechanismCreated ===:${event._id}`);
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
        Logger.debug(`*** MechanismCreated Published ****:${event._id}`);
      } catch (e) {
        Logger.error(e);
      }
    }
  }
}
