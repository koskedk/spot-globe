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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const seed_reader_1 = require("./seed-reader");
const location_seeder_1 = require("./location.seeder");
const practice_seeder_1 = require("./practice.seeder");
const locations_infrastructure_module_1 = require("../locations/locations.infrastructure.module");
const practices_infrastructure_module_1 = require("../practices/practices.infrastructure.module");
let SeederModule = class SeederModule {
    constructor(locationSeeder, practiceSeeder) {
        this.locationSeeder = locationSeeder;
        this.practiceSeeder = practiceSeeder;
    }
    async seedData() {
        await this.locationSeeder.seed();
        await this.practiceSeeder.seed();
    }
};
SeederModule = __decorate([
    common_1.Module({
        imports: [locations_infrastructure_module_1.LocationsInfrastructureModule, practices_infrastructure_module_1.PracticesInfrastructureModule],
        providers: [
            seed_reader_1.SeedReader, practice_seeder_1.PracticeSeeder, location_seeder_1.LocationSeeder,
        ],
    }),
    __metadata("design:paramtypes", [location_seeder_1.LocationSeeder,
        practice_seeder_1.PracticeSeeder])
], SeederModule);
exports.SeederModule = SeederModule;
//# sourceMappingURL=seeder.module.js.map