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
const facility_created_event_1 = require("../facility-created.event");
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
let FacilityCreatedEventHandler = class FacilityCreatedEventHandler {
    constructor(client, repository) {
        this.client = client;
        this.repository = repository;
    }
    async handle(event) {
        common_1.Logger.debug(`=== FacilityCreated ===:${event._id}`);
        const agency = await this.repository.getById(event._id);
        if (agency) {
            await this.client
                .emit(facility_created_event_1.FacilityCreatedEvent.name, JSON.stringify(agency))
                .toPromise()
                .catch(err => common_1.Logger.error(err));
            common_1.Logger.debug(`*** FacilityCreated Published ****:${event._id}`);
        }
    }
};
FacilityCreatedEventHandler = __decorate([
    cqrs_1.EventsHandler(facility_created_event_1.FacilityCreatedEvent),
    __param(0, common_1.Inject('GLOBE_SERVICE')),
    __param(1, common_1.Inject('IFacilityRepository')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy, Object])
], FacilityCreatedEventHandler);
exports.FacilityCreatedEventHandler = FacilityCreatedEventHandler;
//# sourceMappingURL=facility-created.handler.js.map