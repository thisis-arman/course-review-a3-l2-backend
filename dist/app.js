"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
// import { CourseRoutes } from "./app/modules/course/course.route";
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// const router = Router()
// application routes
app.use("/api", routes_1.default);
app.use(globalErrorHandler_1.default);
exports.default = app;
