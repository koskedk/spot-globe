import { EventsHandler, IEvent, IEventHandler } from '@nestjs/cqrs';
import { FacilityCreatedEvent } from '../facility-created.event';
import { Inject, Logger } from '@nestjs/common';
import { FacilityDeletedEvent } from '../facility-deleted.event';
import { ConfigService } from '../../../../config/config.service';
import { MessagingService } from '../../../../infrastructure/messging/messaging.service';
import {
  IAgencyRepository,
  IFacilityRepository,
} from '../../../../domain/practices';

@EventsHandler(FacilityDeletedEvent)
export class FacilityDeletedEventHandler
  implements IEventHandler<FacilityDeletedEvent> {
  constructor(
    private readonly configService: ConfigService,
    private readonly messagingService: MessagingService,
    @Inject('IFacilityRepository')
    private readonly repository: IFacilityRepository,
  ) {}

  handle(event: FacilityDeletedEvent): any {
    Logger.debug(`=== FacilityDeleted ===:${event._id}`);
  }
}
