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
const county_1 = require("../../domain/locations/county");
let LocationSeeder = class LocationSeeder {
    constructor(reader, locationRepository) {
        this.reader = reader;
        this.locationRepository = locationRepository;
    }
    async load() {
        const seedData = await this.reader.read(county_1.County.name.toLowerCase());
        const counties = class_transformer_1.deserializeArray(county_1.County, seedData);
        return counties;
    }
    async seed() {
        const seedData = await this.load();
        const count = await this.locationRepository.getCount();
        if (count === 0) {
            common_1.Logger.log(`Seeding ${county_1.County.name}(s)...`);
            await this.locationRepository.createBatch(seedData);
            return seedData.length;
        }
        return 0;
    }
};
LocationSeeder = __decorate([
    common_1.Injectable(),
    __param(1, common_1.Inject('ILocationRepository')),
    __metadata("design:paramtypes", [seed_reader_1.SeedReader, Object])
], LocationSeeder);
exports.LocationSeeder = LocationSeeder;
//# sourceMappingURL=location.seeder.js.map