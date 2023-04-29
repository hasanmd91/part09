"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PatientService_1 = __importDefault(require("../services/PatientService"));
const utils_1 = __importDefault(require("../utils/utils"));
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    res.send(PatientService_1.default.getPublicPatientData());
});
router.post("/", (req, res) => {
    try {
        console.log(req.body);
        const newPatient = (0, utils_1.default)(req.body);
        console.log(newPatient);
        const addPatiens = PatientService_1.default.addPatients(newPatient);
        res.json(addPatiens);
    }
    catch (error) {
        let errorMessage = "Something went wrong";
        if (error instanceof Error) {
            errorMessage += "Error" + errorMessage;
        }
        res.status(400).send(errorMessage);
    }
});
exports.default = router;
