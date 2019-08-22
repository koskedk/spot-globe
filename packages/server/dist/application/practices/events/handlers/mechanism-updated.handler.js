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
const common_1 = require("@nestjs/common");
const mechanism_updated_event_1 = require("../mechanism-updated.event");
const microservices_1 = require("@nestjs/microservices");
let MechanismUpdatedEventHandler = class MechanismUpdatedEventHandler {
    constructor(client, repository) {
        this.client = client;
        this.repository = repository;
    }
    async handle(event) {
        common_1.Logger.debug(`=== MechanismUpdated ===:${event._id}`);
        const agency = await this.repository.getById(event._id);
        if (agency) {
            await this.client
                .emit(mechanism_updated_event_1.MechanismUpdatedEvent.name, JSON.stringify(agency))
                .toPromise()
                .catch(err => common_1.Logger.error(err));
            common_1.Logger.debug(`*** MechanismUpdated Published ****:${event._id}`);
        }
    }
};
MechanismUpdatedEventHandler = __decorate([
    cqrs_1.EventsHandler(mechanism_updated_event_1.MechanismUpdatedEvent),
    __param(0, common_1.Inject('GLOBE_SERVICE')),
    __param(1, common_1.Inject('IAgencyRepository')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy, Object])
], MechanismUpdatedEventHandler);
exports.MechanismUpdatedEventHandler = MechanismUpdatedEventHandler;
//# sourceMappingURL=mechanism-updated.handler.js.map