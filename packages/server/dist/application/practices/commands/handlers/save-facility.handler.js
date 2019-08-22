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
const save_facility_command_1 = require("../save-facility.command");
const cqrs_1 = require("@nestjs/cqrs");
const facility_1 = require("../../../../domain/practices/facility");
const class_transformer_1 = require("class-transformer");
const common_1 = require("@nestjs/common");
let SaveFacilityHandler = class SaveFacilityHandler {
    constructor(facilityRepository, publisher) {
        this.facilityRepository = facilityRepository;
        this.publisher = publisher;
    }
    async execute(command) {
        if (command._id && command._id !== '00000000-0000-0000-0000-000000000000') {
            return await this.updateFacility(command);
        }
        return await this.createFacility(command);
    }
    async createFacility(command) {
        const newFacility = new facility_1.Facility(command.code, command.name);
        const facility = await this.facilityRepository.create(newFacility);
        this.publisher.mergeObjectContext(newFacility).commit();
        return facility;
    }
    async updateFacility(command) {
        const raw = await this.facilityRepository.get(command._id);
        if (raw) {
            const facilityToUpdate = class_transformer_1.plainToClass(facility_1.Facility, raw);
            facilityToUpdate.changeDetails(command.code, command.name);
            const facility = await this.facilityRepository.update(facilityToUpdate);
            this.publisher.mergeObjectContext(facilityToUpdate).commit();
            return facility;
        }
        else {
            await this.createFacility(command);
        }
    }
};
SaveFacilityHandler = __decorate([
    cqrs_1.CommandHandler(save_facility_command_1.SaveFacilityCommand),
    __param(0, common_1.Inject('IFacilityRepository')),
    __metadata("design:paramtypes", [Object, cqrs_1.EventPublisher])
], SaveFacilityHandler);
exports.SaveFacilityHandler = SaveFacilityHandler;
//# sourceMappingURL=save-facility.handler.js.map