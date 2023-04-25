"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DiagnosesService_1 = __importDefault(require("../services/DiagnosesService"));
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    res.send(DiagnosesService_1.default.getdiagnoseData());
});
exports.default = router;
