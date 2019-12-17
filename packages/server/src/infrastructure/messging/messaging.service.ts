import { Injectable, Logger } from '@nestjs/common';
import { AmqpConnection, RabbitSubscribe } from '@nestjs-plus/rabbitmq';
import { ConfigService } from '../../config/config.service';
import { CommandBus } from '@nestjs/cqrs';

@Injectable()
export class MessagingService {
  constructor(
    private readonly config: ConfigService,
    private readonly amqpConnection: AmqpConnection,
    private readonly commandBus: CommandBus,
  ) {}

  public async publish(
    message: any,
    exchange: string,
    route: string,
  ): Promise<boolean> {
    try {
      await this.amqpConnection.publish(
        exchange,
        route,
        JSON.stringify(message),
      );
      return true;
    } catch (e) {
      Logger.error(e);
      return false;
    }
  }

  /*
  @RabbitSubscribe({exchange: 'stats.exchange',routingKey: 'manifest.route',queue: 'manifest.queue',})
  public async subscribeToManifest(data: any) {}
   */
}
