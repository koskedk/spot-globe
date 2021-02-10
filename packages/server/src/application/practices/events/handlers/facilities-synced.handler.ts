import { EventsHandler, IEvent, IEventHandler } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { FacilitiesSyncedEvent } from '../facilities-synced.event';
import { IFacilityRepository } from '../../../../domain/practices/facility-repository.interface';
import { MessagingService } from '../../../../infrastructure/messging/messaging.service';
import { ConfigService } from '../../../../config/config.service';

@EventsHandler(FacilitiesSyncedEvent)
export class FacilitiesSyncedEventHandler
  implements IEventHandler<FacilitiesSyncedEvent> {
  constructor(
    private readonly configService: ConfigService,
    private readonly messagingService: MessagingService,
    @Inject('IFacilityRepository')
    private readonly facilityRepository: IFacilityRepository,
  ) {}

  async handle(event: FacilitiesSyncedEvent) {
    Logger.debug(`=== [${event.ids.length} ${event.codes.length}] FacilitiesSynced ===`);
    let facilities = [];
    if (event.codes.length > 0) {
      facilities = await this.facilityRepository.getBySyncCodes(event.codes);
    } else {
      facilities = await this.facilityRepository.getBySyncId(event.ids);
    }
    const route = this.configService.QueueGlobeRoutes.find(c =>
      c.includes('practice'),
    );

    if (route && facilities && facilities.length > 0) {
      try {
        await this.messagingService.publish(
          {
            label: FacilitiesSyncedEvent.name,
            body: JSON.stringify(facilities),
          },
          this.configService.QueueGlobeExchange,
          route,
        );
        Logger.debug(`*** FacilitiesSynced Published ****:`);
      } catch (e) {
        Logger.error(e);
      }
    }
  }
}
