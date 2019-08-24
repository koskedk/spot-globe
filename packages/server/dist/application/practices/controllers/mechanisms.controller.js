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
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const queries_1 = require("../queries");
const save_mechanism_command_1 = require("../commands/save-mechanism.command");
const delete_mechanism_command_1 = require("../commands/delete-mechanism.command");
let MechanismsController = class MechanismsController {
    constructor(commandBus, queryBus) {
        this.commandBus = commandBus;
        this.queryBus = queryBus;
    }
    async getMechanisms() {
        return this.queryBus.execute(new queries_1.GetMechanismsQuery());
    }
    async createOrUpdateMechanism(mechanism) {
        return this.commandBus.execute(new save_mechanism_command_1.SaveMechanismCommand(mechanism.code, mechanism.name, mechanism.implementationName, mechanism.agency, mechanism._id));
    }
    async deleteMechanism(id) {
        return this.commandBus.execute(new delete_mechanism_command_1.DeleteMechanismCommand(id));
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MechanismsController.prototype, "getMechanisms", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MechanismsController.prototype, "createOrUpdateMechanism", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MechanismsController.prototype, "deleteMechanism", null);
MechanismsController = __decorate([
    common_1.Controller('mechanisms'),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        cqrs_1.QueryBus])
], MechanismsController);
exports.MechanismsController = MechanismsController;
//# sourceMappingURL=mechanisms.controller.js.map