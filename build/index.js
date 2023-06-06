"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_controler_1 = __importDefault(require("./routes/apiv1/auth/auth.controler"));
const bd_model_1 = __importDefault(require("./common/model/bd.model"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/ping', (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bd_model_1.default.query("SELECT 1+1 AS result");
    res.json({ result });
}));
app.use('/apiv1', (0, cors_1.default)(), auth_controler_1.default);
exports.default = app;
