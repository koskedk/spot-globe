"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const cqrs_1 = require("@nestjs/cqrs");
const agency_created_event_1 = require("../agency-created.event");
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const agency_updated_event_1 = require("../agency-updated.event");
let AgencyCreatedEventHandler = class AgencyCreatedEventHandler {
    constructor(client, agencyRepository) {
        this.client = client;
        this.agencyRepository = agencyRepository;
    }
    async handle(event) {
        const pattern = {};
        common_1.Logger.debug(`=== AgencyCreated ===:${event._id}`);
        const agency = await this.agencyRepository.get(event._id);
        if (agency) {
            await this.client
                .emit(agency_updated_event_1.AgencyUpdatedEvent.name, JSON.stringify(agency))
                .toPromise()
                .catch(err => common_1.Logger.error(err));
            common_1.Logger.debug(`*** AgencyCreated Published ****:${event._id}`);
        }
    }
};
AgencyCreatedEventHandler = __decorate([
    cqrs_1.EventsHandler(agency_created_event_1.AgencyCreatedEvent),
    __param(0, common_1.Inject('GLOBE_SERVICE')),
    __param(1, common_1.Inject('IAgencyRepository')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy, Object])
], AgencyCreatedEventHandler);
exports.AgencyCreatedEventHandler = AgencyCreatedEventHandler;
//# sourceMappingURL=agency-created.handler.js.map