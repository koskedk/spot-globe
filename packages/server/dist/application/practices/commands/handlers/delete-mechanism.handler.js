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
const delete_mechanism_command_1 = require("../delete-mechanism.command");
const mechanism_deleted_event_1 = require("../../events/mechanism-deleted.event");
const common_1 = require("@nestjs/common");
let DeleteMechanismHandler = class DeleteMechanismHandler {
    constructor(mechanismRepository, eventBus) {
        this.mechanismRepository = mechanismRepository;
        this.eventBus = eventBus;
    }
    async execute(command) {
        const result = await this.mechanismRepository.delete(command._id);
        if (result) {
            this.eventBus.publish(new mechanism_deleted_event_1.MechanismDeletedEvent(command._id));
            return true;
        }
        return false;
    }
};
DeleteMechanismHandler = __decorate([
    cqrs_1.CommandHandler(delete_mechanism_command_1.DeleteMechanismCommand),
    __param(0, common_1.Inject('IMechanismRepository')),
    __metadata("design:paramtypes", [Object, cqrs_1.EventBus])
], DeleteMechanismHandler);
exports.DeleteMechanismHandler = DeleteMechanismHandler;
//# sourceMappingURL=delete-mechanism.handler.js.map