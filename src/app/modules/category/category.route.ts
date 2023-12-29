import express from "express";
import { CategoryController } from "./category.controller";
import validateRequest from "../../middleware/validateRequest";
import { categoryValidations } from "./category.validation";

const router = express.Router();

router.post(
  "/categories",
  validateRequest(categoryValidations.createCategoryValidation),
  CategoryController.createCategory
);
router.delete("/category/:id", CategoryController.deleteCategory);
router.get("/categories", CategoryController.getAllCategories);
router.get("/:id", CategoryController.getSingleCategory);
// router.patch("/:studentId", CourseController.);

export const CategoryRoutes = router;
