"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PatientService_1 = __importDefault(require("../services/PatientService"));
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    res.send(PatientService_1.default.getPublicPatientData());
});
router.post("/", (req, res) => {
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    const addPatiens = PatientService_1.default.addPatients({
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation,
    });
    res.json(addPatiens);
});
exports.default = router;
