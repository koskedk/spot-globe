"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const controllers_1 = require("./controllers");
const queries_1 = require("./queries");
const locations_1 = require("../../infrastructure/locations");
const messaging_module_1 = require("../../infrastructure/messging/messaging.module");
let LocationsModule = class LocationsModule {
};
LocationsModule = __decorate([
    common_1.Module({
        imports: [
            cqrs_1.CqrsModule,
            messaging_module_1.MessagingModule,
            locations_1.LocationsInfrastructureModule,
        ],
        controllers: [controllers_1.LocationsController],
        providers: [queries_1.GetLocationsHandler],
    })
], LocationsModule);
exports.LocationsModule = LocationsModule;
//# sourceMappingURL=locations.module.js.map