"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const practices_1 = require("../../../domain/practices");
exports.agencySchema = new mongoose.Schema({
    _id: String,
    name: String,
    display: String,
    mechanisms: [{ type: String, ref: practices_1.Mechanism.name }],
});
//# sourceMappingURL=agency.schema.js.map