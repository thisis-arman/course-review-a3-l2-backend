import express from "express";
import { CourseController } from "./course.controller";
import validateRequest from "../../middleware/validateRequest";
import { courseValidations } from "./course.validation";

const router = express.Router();

router.post(
  "/course",
  validateRequest(courseValidations.createCourseValidation),
  CourseController.createCourse
);
router.get("/courses", CourseController.getAllCourses);
router.delete("/:id", CourseController.deleteCourse);
router.get("/course/:id", CourseController.getSingleCourse);
router.get("/courses/:id/reviews", CourseController.getSingleCourseReview);
router.patch(
  "/courses/:id",
  validateRequest(courseValidations.updateCourseValidation),
  CourseController.updateCourse
);

// router.get("/api/course/best");

export const CourseRoutes = router;
