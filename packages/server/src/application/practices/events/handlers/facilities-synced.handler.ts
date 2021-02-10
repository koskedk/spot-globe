import { EventsHandler, IEvent, IEventHandler } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { FacilitiesSyncedEvent } from '../facilities-synced.event';
import { IFacilityRepository } from '../../../../domain/practices/facility-repository.interface';
import { MessagingService } from '../../../../infrastructure/messging/messaging.service';
import { ConfigService } from '../../../../config/config.service';
import {IMechanismRepository} from '../../../../domain/practices';

@EventsHandler(FacilitiesSyncedEvent)
export class FacilitiesSyncedEventHandler
  implements IEventHandler<FacilitiesSyncedEvent> {
  constructor(
      private readonly configService: ConfigService,
      private readonly messagingService: MessagingService,
      @Inject('IFacilityRepository')
      private readonly facilityRepository: IFacilityRepository,
      @Inject('IMechanismRepository')
      private readonly mechanismRepository: IMechanismRepository,
  ) {
  }

  async handle(event: FacilitiesSyncedEvent) {
    let facilities = [];
    if (event.ids) {
      Logger.debug(`=== [${event.ids.length}] FacilitiesSynced ===`);
      facilities = await this.facilityRepository.getBySyncId(event.ids);
    }
    if (event.codes) {
      Logger.debug(`=== ${event.codes.length}] FacilitiesSynced ===`);
      facilities = await this.facilityRepository.getBySyncCodes(event.codes);
    }
    if (event.partner) {
      Logger.debug(`=== ${event.partner}] FacilitiesSynced ===`);
      const mechanisms = await this.mechanismRepository.getMechanismsByName(event.partner);
      if (mechanisms && mechanisms.length > 0) {
        const ids = mechanisms.map((m) => m._id);
        facilities = await this.facilityRepository.getBySyncMechanismsId(ids);
      }
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
