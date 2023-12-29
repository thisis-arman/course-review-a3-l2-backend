"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("./category.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const category_validation_1 = require("./category.validation");
const router = express_1.default.Router();
router.post("/categories", (0, validateRequest_1.default)(category_validation_1.categoryValidations.createCategoryValidation), category_controller_1.CategoryController.createCategory);
router.delete("/category/:id", category_controller_1.CategoryController.deleteCategory);
router.get("/categories", category_controller_1.CategoryController.getAllCategories);
router.get("/category/:id", category_controller_1.CategoryController.getSingleCategory);
// router.patch("/:studentId", CourseController.);
exports.CategoryRoutes = router;
