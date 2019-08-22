"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const locations_module_1 = require("./application/locations/locations.module");
const practices_module_1 = require("./application/practices/practices.module");
const seeder_module_1 = require("./infrastructure/seeder/seeder.module");
const cqrs_1 = require("@nestjs/cqrs");
const routes_1 = require("./routes");
const nest_router_1 = require("nest-router");
const config_module_1 = require("./config/config.module");
const database_module_1 = require("./database/database.module");
const cloudUrl = `mongodb+srv://livetest:maun@cluster0-v6fcj.mongodb.net/dwapiGlobe?retryWrites=true&w=majority`;
const localUrl = "mongodb://localhost/dwapiGlobe";
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_module_1.ConfigModule,
            nest_router_1.RouterModule.forRoutes(routes_1.routes),
            cqrs_1.CqrsModule,
            database_module_1.DatabaseModule,
            locations_module_1.LocationsModule,
            practices_module_1.PracticesModule,
            seeder_module_1.SeederModule
        ],
        controllers: [app_controller_1.AppController],
        providers: []
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map