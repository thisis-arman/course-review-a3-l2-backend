import express from "express";
import { CourseController } from "./course.controller";

const router = express.Router();

router.post("/", CourseController.createCourse);
router.delete("/:id", CourseController.deleteCourse);
router.get("/", CourseController.getAllCourses);
router.get("/id", CourseController.getSingleCourse);
// router.patch("/:studentId", CourseController.);

export const CourseRoutes = router;
