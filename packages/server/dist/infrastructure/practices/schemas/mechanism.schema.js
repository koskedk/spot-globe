"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const practices_1 = require("../../../domain/practices");
exports.mechanismSchema = new mongoose.Schema({
    _id: String,
    name: String,
    implementationName: String,
    display: String,
    agency: { type: String, ref: practices_1.Agency.name },
    facilities: [{ type: String, ref: practices_1.Facility.name }],
});
//# sourceMappingURL=mechanism.schema.js.map