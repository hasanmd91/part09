"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PatientService_1 = __importDefault(require("../services/PatientService"));
const router = express_1.default.Router();
console.log(PatientService_1.default.getEntries());
router.get("/", (_req, res) => {
    res.send(PatientService_1.default.getEntries());
});
router.post("/", (_req, res) => {
    res.send("Saving a diary!");
});
exports.default = router;
