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
const save_agency_command_1 = require("../save-agency.command");
const cqrs_1 = require("@nestjs/cqrs");
const agency_1 = require("../../../../domain/practices/agency");
const class_transformer_1 = require("class-transformer");
const common_1 = require("@nestjs/common");
let SaveAgencyHandler = class SaveAgencyHandler {
    constructor(agencyRepository, publisher) {
        this.agencyRepository = agencyRepository;
        this.publisher = publisher;
    }
    async execute(command) {
        if (command._id && command._id !== '00000000-0000-0000-0000-000000000000') {
            return await this.updateAgency(command);
        }
        return await this.createAgency(command);
    }
    async createAgency(command) {
        const newAgency = new agency_1.Agency(command.name, command.display);
        const agency = await this.agencyRepository.create(newAgency);
        this.publisher.mergeObjectContext(newAgency).commit();
        return agency;
    }
    async updateAgency(command) {
        const raw = await this.agencyRepository.get(command._id);
        if (raw) {
            const agencyToUpdate = class_transformer_1.plainToClass(agency_1.Agency, raw);
            agencyToUpdate.changeDetails(command.name, command.display);
            const agency = await this.agencyRepository.update(agencyToUpdate);
            this.publisher.mergeObjectContext(agencyToUpdate).commit();
            return agency;
        }
    }
};
SaveAgencyHandler = __decorate([
    cqrs_1.CommandHandler(save_agency_command_1.SaveAgencyCommand),
    __param(0, common_1.Inject('IAgencyRepository')),
    __metadata("design:paramtypes", [Object, cqrs_1.EventPublisher])
], SaveAgencyHandler);
exports.SaveAgencyHandler = SaveAgencyHandler;
//# sourceMappingURL=save-agency.handler.js.map