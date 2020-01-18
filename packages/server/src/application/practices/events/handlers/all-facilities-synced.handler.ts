import { EventsHandler, IEvent, IEventHandler } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { AllFacilitiesSyncedEvent } from '../all-facilities-synced.event';
import { IFacilityRepository } from '../../../../domain/practices/facility-repository.interface';
import { MessagingService } from '../../../../infrastructure/messging/messaging.service';
import { ConfigService } from '../../../../config/config.service';
import { FacilityBagDto } from '../../../../domain/practices/dtos/facility-bag.dto';
import { Packager } from '../../../../domain/common/packager';

@EventsHandler(AllFacilitiesSyncedEvent)
export class AllFacilitiesSyncedEventHandler
  implements IEventHandler<AllFacilitiesSyncedEvent> {
  constructor(
    private readonly configService: ConfigService,
    private readonly messagingService: MessagingService,
    @Inject('IFacilityRepository')
    private readonly facilityRepository: IFacilityRepository,
  ) {}

  async handle(event: AllFacilitiesSyncedEvent) {
    Logger.debug(`=== All FacilitiesSynced ===`);

    const route = this.configService.QueueGlobeRoutes.find(c =>
      c.includes('practice'),
    );

    const packager = new Packager();
    const totalRecords = await this.facilityRepository.getCount();
    const pageCount = packager.getPageCount(event.batchSize, totalRecords);

    for (let page = 1; page <= pageCount; page++) {
      const facilities = await this.facilityRepository.getAllToSync(
        event.batchSize,
        page,
      );

      if (route && facilities && facilities.length > 0) {
        try {
          await this.messagingService.publish(
            {
              label: AllFacilitiesSyncedEvent.name,
              body: JSON.stringify(facilities),
            },
            this.configService.QueueGlobeExchange,
            route,
          );
          Logger.debug(
            `***All FacilitiesSynced Published:${page} of ${pageCount} ****:`,
          );
        } catch (e) {
          Logger.error(e);
        }
      }
    }
  }
}
