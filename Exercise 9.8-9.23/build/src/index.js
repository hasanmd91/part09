"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const patients_1 = __importDefault(require("./routes/patients"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const PORT = 3000;
app.get("/ping", (_req, res) => {
    res.send("pong");
});
app.use("/api", patients_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});