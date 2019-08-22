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
var _a;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const common_1 = require("../common");
const practices_1 = require("../../domain/practices");
const locations_1 = require("../../domain/locations");
let FacilityRepository = class FacilityRepository extends common_1.BaseRepository {
    constructor(model) {
        super(model);
    }
    async getById(id) {
        const result = await this.model
            .findById(id)
            .populate(practices_1.Mechanism.name.toLowerCase())
            .populate(locations_1.County.name.toLowerCase())
            .exec();
        return result;
    }
    async getFacilities(mechanismId) {
        let results = [];
        if (mechanismId) {
            results = await this.model
                .find({ mechanism: mechanismId })
                .populate(practices_1.Mechanism.name.toLowerCase())
                .populate(locations_1.County.name.toLowerCase())
                .exec();
        }
        else {
            results = await this.model
                .find()
                .populate(practices_1.Mechanism.name.toLowerCase())
                .populate(locations_1.County.name.toLowerCase())
                .exec();
        }
        return results;
    }
};
FacilityRepository = __decorate([
    __param(0, mongoose_1.InjectModel(practices_1.Facility.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], FacilityRepository);
exports.FacilityRepository = FacilityRepository;
//# sourceMappingURL=facility.repository.js.map