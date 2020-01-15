import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';
import * as fs from 'fs';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Injectable, Logger } from '@nestjs/common';

export interface EnvConfig {
  [key: string]: string;
}
@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
    Logger.log(`running in ${filePath}`);
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['development', 'production', 'test', 'provision'])
        .default('development'),
      GLOBE_PORT: Joi.number().default(4710),
      GLOBE_RABBITMQ_URI: Joi.string().default(
        'amqp://guest:guest@localhost:5672/spot',
      ),
      GLOBE_RABBITMQ_EXCHANGE: Joi.string().default('globe.exchange'),
      GLOBE_RABBITMQ_EXCHANGE_TYPE: Joi.string().default('direct'),
      GLOBE_RABBITMQ_ROUTES: Joi.string().default('practice.route'),
      GLOBE_RABBITMQ_QUEUES: Joi.string().default('practice.queue'),
      STATS_RABBITMQ_URI: Joi.string().default(
        'amqp://guest:guest@localhost:5672/spot',
      ),
      STATS_RABBITMQ_EXCHANGE: Joi.string().default('stats.exchange'),
      STATS_RABBITMQ_EXCHANGE_TYPE: Joi.string().default('direct'),
      STATS_RABBITMQ_ROUTES: Joi.string().default('manifest.route|stats.route'),

      GLOBE_MONGODB_URI: Joi.string().default('mongodb://localhost/dwapiGlobe'),
      GLOBE_KEY: Joi.string().default('koskedk.com+5-key.pem'),
      GLOBE_CERT: Joi.string().default('koskedk.com+5.pem'),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get Port(): number {
    return Number(this.envConfig.GLOBE_PORT);
  }

  get QueueGlobeUri(): string {
    return String(this.envConfig.GLOBE_RABBITMQ_URI);
  }

  get QueueGlobeExchange(): string {
    return String(this.envConfig.GLOBE_RABBITMQ_EXCHANGE);
  }

  get QueueGlobeExchangeType(): string {
    return String(this.envConfig.GLOBE_RABBITMQ_EXCHANGE_TYPE);
  }

  get QueueGlobeRoutes(): string[] {
    return this.envConfig.GLOBE_RABBITMQ_ROUTES.split('|');
  }
  get QueueGlobeQueues(): string[] {
    return this.envConfig.GLOBE_RABBITMQ_QUEUES.split('|');
  }

  get QueueStatsUri(): string {
    return String(this.envConfig.STATS_RABBITMQ_URI);
  }

  get QueueStatsExchange(): string {
    return String(this.envConfig.STATS_RABBITMQ_EXCHANGE);
  }

  get QueueStatsExchangeType(): string {
    return String(this.envConfig.STATS_RABBITMQ_EXCHANGE_TYPE);
  }
  get QueueStatsRoutes(): string[] {
    return this.envConfig.STATS_RABBITMQ_ROUTES.split('|');
  }

  get Database(): string {
    return String(this.envConfig.GLOBE_MONGODB_URI);
  }

  get SslKey(): string {
    return String(this.envConfig.GLOBE_KEY);
  }
  get SslCert(): string {
    return String(this.envConfig.GLOBE_CERT);
  }
}
