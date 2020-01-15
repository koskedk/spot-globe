import { RabbitMQModule } from '@nestjs-plus/rabbitmq';
import { ConfigModule } from '../../config/config.module';
import { ConfigService } from '../../config/config.service';

export const messagingProviders = [
  RabbitMQModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => ({
      exchanges: [
        {
          name: config.QueueGlobeExchange,
          type: config.QueueGlobeExchangeType,
        },
        {
          name: config.QueueGlobeExchange,
          type: config.QueueGlobeExchangeType,
        },
      ],
      uri: config.QueueGlobeUri,
    }),
  }),
];
