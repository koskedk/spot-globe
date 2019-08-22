"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const practices_1 = require("../../domain/practices");
const mechanism_schema_1 = require("./schemas/mechanism.schema");
const facility_schema_1 = require("./schemas/facility.schema");
const agency_schema_1 = require("./schemas/agency.schema");
const mechanism_repository_1 = require("./mechanism.repository");
const facility_repository_1 = require("./facility.repository");
const agency_repository_1 = require("./agency.repository");
let PracticesInfrastructureModule = class PracticesInfrastructureModule {
};
PracticesInfrastructureModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: practices_1.Agency.name, schema: agency_schema_1.agencySchema }]),
            mongoose_1.MongooseModule.forFeature([
                { name: practices_1.Mechanism.name, schema: mechanism_schema_1.mechanismSchema },
            ]),
            mongoose_1.MongooseModule.forFeature([
                { name: practices_1.Facility.name, schema: facility_schema_1.facilitySchema },
            ]),
        ],
        providers: [
            { provide: 'IAgencyRepository', useClass: agency_repository_1.AgencyRepository },
            { provide: 'IFacilityRepository', useClass: facility_repository_1.FacilityRepository },
            { provide: 'IMechanismRepository', useClass: mechanism_repository_1.MechanismRepository },
        ],
        exports: [
            { provide: 'IAgencyRepository', useClass: agency_repository_1.AgencyRepository },
            { provide: 'IFacilityRepository', useClass: facility_repository_1.FacilityRepository },
            { provide: 'IMechanismRepository', useClass: mechanism_repository_1.MechanismRepository },
        ],
    })
], PracticesInfrastructureModule);
exports.PracticesInfrastructureModule = PracticesInfrastructureModule;
//# sourceMappingURL=practices.infrastructure.module.js.map