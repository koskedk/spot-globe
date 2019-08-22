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
const seed_reader_1 = require("./seed-reader");
const class_transformer_1 = require("class-transformer");
const agency_1 = require("../../domain/practices/agency");
const mechanism_1 = require("../../domain/practices/mechanism");
const facility_1 = require("../../domain/practices/facility");
let PracticeSeeder = class PracticeSeeder {
    constructor(reader, agencyRepository, mechanismRepository, facilityRepository) {
        this.reader = reader;
        this.agencyRepository = agencyRepository;
        this.mechanismRepository = mechanismRepository;
        this.facilityRepository = facilityRepository;
    }
    async loadAgencies() {
        const seedData = await this.reader.read(agency_1.Agency.name.toLowerCase());
        const agencies = class_transformer_1.deserializeArray(agency_1.Agency, seedData);
        return agencies;
    }
    async loadFacilities() {
        const seedData = await this.reader.read(facility_1.Facility.name.toLowerCase());
        const facilities = class_transformer_1.deserializeArray(facility_1.Facility, seedData);
        return facilities;
    }
    async loadMechanisms() {
        const seedData = await this.reader.read(mechanism_1.Mechanism.name.toLowerCase());
        const mechanisms = class_transformer_1.deserializeArray(mechanism_1.Mechanism, seedData);
        return mechanisms;
    }
    async seed() {
        const agencies = await this.loadAgencies();
        const mechanisms = await this.loadMechanisms();
        const facilities = await this.loadFacilities();
        const ggenciesCount = await this.agencyRepository.getCount();
        if (ggenciesCount === 0) {
            common_1.Logger.log(`Seeding ${agency_1.Agency.name}(s)...`);
            await this.agencyRepository.createBatch(agencies);
        }
        const mechanismsCount = await this.mechanismRepository.getCount();
        if (mechanismsCount === 0) {
            common_1.Logger.log(`Seeding ${mechanism_1.Mechanism.name}(s)...`);
            await this.mechanismRepository.createBatch(mechanisms);
        }
        const facilitiesCount = await this.facilityRepository.getCount();
        if (facilitiesCount === 0) {
            common_1.Logger.log(`Seeding ${facility_1.Facility.name}(s)..`);
            await this.facilityRepository.createBatch(facilities);
        }
        return 0;
    }
};
PracticeSeeder = __decorate([
    common_1.Injectable(),
    __param(1, common_1.Inject('IAgencyRepository')),
    __param(2, common_1.Inject('IMechanismRepository')),
    __param(3, common_1.Inject('IFacilityRepository')),
    __metadata("design:paramtypes", [seed_reader_1.SeedReader, Object, Object, Object])
], PracticeSeeder);
exports.PracticeSeeder = PracticeSeeder;
//# sourceMappingURL=practice.seeder.js.map