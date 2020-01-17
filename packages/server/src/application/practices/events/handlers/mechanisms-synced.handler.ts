import { EventsHandler, IEvent, IEventHandler } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { MechanismsSyncedEvent } from '../mechanisms-synced.event';
import { IMechanismRepository } from '../../../../domain/practices/mechanism-repository.interface';
import { MessagingService } from '../../../../infrastructure/messging/messaging.service';
import { ConfigService } from '../../../../config/config.service';

@EventsHandler(MechanismsSyncedEvent)
export class MechanismsSyncedEventHandler
  implements IEventHandler<MechanismsSyncedEvent> {
  constructor(
    private readonly configService: ConfigService,
    private readonly messagingService: MessagingService,
    @Inject('IMechanismRepository')
    private readonly mechanismRepository: IMechanismRepository,
  ) {}

  async handle(event: MechanismsSyncedEvent) {
    Logger.debug(`=== [${event.ids.length}] MechanismsSynced ===`);
    const agencies = await this.mechanismRepository.getBySyncId(event.ids);
    const route = this.configService.QueueGlobeRoutes.find(c =>
      c.includes('practice'),
    );

    if (route && agencies && agencies.length > 0) {
      try {
        await this.messagingService.publish(
          { label: MechanismsSyncedEvent.name, body: JSON.stringify(agencies) },
          this.configService.QueueGlobeExchange,
          route,
        );
        Logger.debug(`*** MechanismsSynced Published ****:`);
      } catch (e) {
        Logger.error(e);
      }
    }
  }
}
