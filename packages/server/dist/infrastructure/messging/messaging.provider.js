"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_service_1 = require("../../config/config.service");
const microservices_1 = require("@nestjs/microservices");
exports.messagingProvider = {
    provide: 'GLOBE_SERVICE',
    useFactory: (configService) => {
        return microservices_1.ClientProxyFactory.create(configService.QueueConfig);
    },
    inject: [config_service_1.ConfigService],
};
//# sourceMappingURL=messaging.provider.js.map