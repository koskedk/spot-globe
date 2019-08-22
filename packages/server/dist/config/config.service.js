"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const Joi = require("@hapi/joi");
const fs = require("fs");
class ConfigService {
    constructor(filePath) {
        const config = dotenv.parse(fs.readFileSync(filePath));
        this.envConfig = this.validateInput(config);
    }
    validateInput(envConfig) {
        const envVarsSchema = Joi.object({
            NODE_ENV: Joi.string()
                .valid(["development", "production", "test", "provision"])
                .default("development"),
            GLOBE_PORT: Joi.number().default(4710),
            GLOBE_RABBITMQ_HOST: Joi.string().default("amqp://localhost:5672/spot"),
            GLOBE_RABBITMQ_USER: Joi.string().default("guest"),
            GLOBE_RABBITMQ_PASS: Joi.string().default("guest"),
            GLOBE_RABBITMQ_QUEUE: Joi.string().default("stats_queue"),
            GLOBE_MONGODB_URI: Joi.string().default("mongodb://localhost/dwapiGlobe")
        });
        const { error, value: validatedEnvConfig } = Joi.validate(envConfig, envVarsSchema);
        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }
        return validatedEnvConfig;
    }
    get Port() {
        return Number(this.envConfig.GLOBE_PORT);
    }
    get QueueHost() {
        return String(this.envConfig.GLOBE_RABBITMQ_HOST);
    }
    get QueueUser() {
        return String(this.envConfig.GLOBE_RABBITMQ_USER);
    }
    get QueuePassword() {
        return String(this.envConfig.GLOBE_RABBITMQ_PASS);
    }
    get QueueName() {
        return String(this.envConfig.GLOBE_RABBITMQ_QUEUE);
    }
    get Database() {
        return String(this.envConfig.GLOBE_MONGODB_URI);
    }
}
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map