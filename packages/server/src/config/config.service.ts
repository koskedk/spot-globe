import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';
import * as fs from 'fs';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

export interface EnvConfig {
  [key: string]: string;
}

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
      GLOBE_RABBITMQ_HOST: Joi.string().default('amqp://localhost:5672/spot'),
      GLOBE_RABBITMQ_USER: Joi.string().default('guest'),
      GLOBE_RABBITMQ_PASS: Joi.string().default('guest'),
      GLOBE_RABBITMQ_QUEUE: Joi.string().default('globe_queue'),
      GLOBE_MONGODB_URI: Joi.string().default('mongodb://localhost/dwapiGlobe'),
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

  get QueueHost(): string {
    return String(this.envConfig.GLOBE_RABBITMQ_HOST);
  }

  get QueueUser(): string {
    return String(this.envConfig.GLOBE_RABBITMQ_USER);
  }

  get QueuePassword(): string {
    return String(this.envConfig.GLOBE_RABBITMQ_PASS);
  }

  get QueueName(): string {
    return String(this.envConfig.GLOBE_RABBITMQ_QUEUE);
  }

  get Database(): string {
    return String(this.envConfig.GLOBE_MONGODB_URI);
  }

  get QueueConfig(): any {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [this.QueueHost],
        queue: this.QueueName,
        user: this.QueueUser,
        pass: this.QueuePassword,
        queueOptions: { durable: true },
      },
    };
  }
}
