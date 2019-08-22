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
const microservices_1 = require("@nestjs/microservices");
const practices_1 = require("../../infrastructure/practices");
const events_1 = require("./events");
const controllers_1 = require("./controllers");
const save_agency_handler_1 = require("./commands/handlers/save-agency.handler");
const delete_facility_handler_1 = require("./commands/handlers/delete-facility.handler");
const save_facility_handler_1 = require("./commands/handlers/save-facility.handler");
const queries_1 = require("./queries");
const delete_agency_handler_1 = require("./commands/handlers/delete-agency.handler");
const save_mechanism_handler_1 = require("./commands/handlers/save-mechanism.handler");
const delete_mechanism_handler_1 = require("./commands/handlers/delete-mechanism.handler");
let PracticesModule = class PracticesModule {
};
PracticesModule = __decorate([
    common_1.Module({
        imports: [
            cqrs_1.CqrsModule,
            microservices_1.ClientsModule.register([
                {
                    name: 'GLOBE_SERVICE',
                    transport: microservices_1.Transport.RMQ,
                    options: {
                        urls: [`amqp://localhost:5672/spot`],
                        queue: 'stats_queue',
                        queueOptions: { durable: true },
                    },
                },
            ]),
            practices_1.PracticesInfrastructureModule,
        ],
        controllers: [controllers_1.AgenciesController, controllers_1.FacilitiesController, controllers_1.MechanismsController],
        providers: [
            save_agency_handler_1.SaveAgencyHandler,
            delete_agency_handler_1.DeleteAgencyHandler,
            save_facility_handler_1.SaveFacilityHandler,
            delete_facility_handler_1.DeleteFacilityHandler,
            save_mechanism_handler_1.SaveMechanismHandler,
            delete_mechanism_handler_1.DeleteMechanismHandler,
            queries_1.GetAgenciesHandler,
            queries_1.GetMechanismsHandler,
            queries_1.GetFacilitiesHandler,
            events_1.AgencyCreatedEventHandler,
            events_1.AgencyDeletedEventHandler,
            events_1.AgencyUpdatedEventHandler,
            events_1.FacilityCreatedEventHandler,
            events_1.FacilityDeletedEventHandler,
            events_1.FacilityUpdatedEventHandler,
            events_1.MechanismCreatedEventHandler,
            events_1.MechanismDeletedEventHandler,
            events_1.MechanismUpdatedEventHandler,
        ],
    })
], PracticesModule);
exports.PracticesModule = PracticesModule;
//# sourceMappingURL=practices.module.js.map