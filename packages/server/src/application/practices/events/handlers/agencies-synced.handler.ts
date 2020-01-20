import { EventsHandler, IEvent, IEventHandler } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { AgenciesSyncedEvent } from '../agencies-synced.event';
import { IAgencyRepository } from '../../../../domain/practices/agency-repository.interface';
import { MessagingService } from '../../../../infrastructure/messging/messaging.service';
import { ConfigService } from '../../../../config/config.service';
import { plainToClass } from 'class-transformer';
import { Agency } from '../../../../domain/practices';

@EventsHandler(AgenciesSyncedEvent)
export class AgenciesSyncedEventHandler
  implements IEventHandler<AgenciesSyncedEvent> {
  constructor(
    private readonly configService: ConfigService,
    private readonly messagingService: MessagingService,
    @Inject('IAgencyRepository')
    private readonly agencyRepository: IAgencyRepository,
  ) {}

  async handle(event: AgenciesSyncedEvent) {
    Logger.debug(`=== [${event.ids.length}] AgenciesSynced ===`);
    const agencies = await this.agencyRepository.getBySyncId(event.ids);
    const route = this.configService.QueueGlobeRoutes.find(c =>
      c.includes('practice'),
    );

    if (route && agencies && agencies.length > 0) {
      try {
        await this.messagingService.publish(
          { label: AgenciesSyncedEvent.name, body: JSON.stringify(agencies) },
          this.configService.QueueGlobeExchange,
          route,
        );
        Logger.debug(`*** AgenciesSynced Published ****:`);
      } catch (e) {
        Logger.error(e);
      }
    }
  }
}
