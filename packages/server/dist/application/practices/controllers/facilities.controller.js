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
const common_2 = require("../../common");
const queries_1 = require("../queries");
const save_facility_command_1 = require("../commands/save-facility.command");
const delete_facility_command_1 = require("../commands/delete-facility.command");
let FacilitiesController = class FacilitiesController {
    constructor(commandBus, queryBus) {
        this.commandBus = commandBus;
        this.queryBus = queryBus;
    }
    async getFacilities() {
        return this.queryBus.execute(new queries_1.GetFacilitiesQuery());
    }
    async createOrUpdateFacility(facility) {
        return this.commandBus.execute(new save_facility_command_1.SaveFacilityCommand(facility.code, facility.name, facility._id));
    }
    async deleteFacility(id) {
        return this.commandBus.execute(new delete_facility_command_1.DeleteFacilityCommand(id));
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FacilitiesController.prototype, "getFacilities", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FacilitiesController.prototype, "createOrUpdateFacility", null);
__decorate([
    common_1.Delete(':_id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FacilitiesController.prototype, "deleteFacility", null);
FacilitiesController = __decorate([
    common_1.UseInterceptors(common_2.LoggingInterceptor),
    common_1.Controller('facilities'),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        cqrs_1.QueryBus])
], FacilitiesController);
exports.FacilitiesController = FacilitiesController;
//# sourceMappingURL=facilities.controller.js.map