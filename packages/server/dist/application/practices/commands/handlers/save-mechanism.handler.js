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
const save_mechanism_command_1 = require("../save-mechanism.command");
const cqrs_1 = require("@nestjs/cqrs");
const mechanism_1 = require("../../../../domain/practices/mechanism");
const class_transformer_1 = require("class-transformer");
const common_1 = require("@nestjs/common");
let SaveMechanismHandler = class SaveMechanismHandler {
    constructor(mechanismRepository, publisher) {
        this.mechanismRepository = mechanismRepository;
        this.publisher = publisher;
    }
    async execute(command) {
        if (command._id && command._id !== '00000000-0000-0000-0000-000000000000') {
            return await this.updateMechanism(command);
        }
        return await this.createMechanism(command);
    }
    async createMechanism(command) {
        const newMechanism = new mechanism_1.Mechanism(command.code, command.name, command.implementationName, command.agency);
        const mechanism = await this.mechanismRepository.create(newMechanism);
        this.publisher.mergeObjectContext(newMechanism).commit();
        return mechanism;
    }
    async updateMechanism(command) {
        const raw = await this.mechanismRepository.get(command._id);
        if (raw) {
            const mechanismToUpdate = class_transformer_1.plainToClass(mechanism_1.Mechanism, raw);
            mechanismToUpdate.changeDetails(command.code, command.name, command.implementationName, command.agency);
            const mechanism = await this.mechanismRepository.update(mechanismToUpdate);
            this.publisher.mergeObjectContext(mechanismToUpdate).commit();
            return mechanism;
        }
    }
};
SaveMechanismHandler = __decorate([
    cqrs_1.CommandHandler(save_mechanism_command_1.SaveMechanismCommand),
    __param(0, common_1.Inject('IMechanismRepository')),
    __metadata("design:paramtypes", [Object, cqrs_1.EventPublisher])
], SaveMechanismHandler);
exports.SaveMechanismHandler = SaveMechanismHandler;
//# sourceMappingURL=save-mechanism.handler.js.map