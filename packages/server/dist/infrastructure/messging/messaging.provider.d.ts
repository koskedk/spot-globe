import { ConfigService } from '../../config/config.service';
export declare const messagingProvider: {
    provide: string;
    useFactory: (configService: ConfigService) => import("@nestjs/microservices").ClientGrpcProxy;
    inject: (typeof ConfigService)[];
};
