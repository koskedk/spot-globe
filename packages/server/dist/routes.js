"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const practices_module_1 = require("./application/practices/practices.module");
const locations_module_1 = require("./application/locations/locations.module");
exports.routes = [
    {
        path: 'api/v1/practices',
        module: practices_module_1.PracticesModule,
    },
    {
        path: 'api/v1/locations',
        module: locations_module_1.LocationsModule,
    },
];
//# sourceMappingURL=routes.js.map