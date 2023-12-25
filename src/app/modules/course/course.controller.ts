import { RequestHandler } from "express";
import httpStatus from "http-status";
import { CourseServices } from "./course.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const createCourse: RequestHandler = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);

  sendResponse(res, {
    statusCode: Number(httpStatus.ok),
    success: true,
    message: "Course created successfully",
    data: result,
  });
});

const getAllCourses: RequestHandler = catchAsync(async (req, res) => {
  const courses = await CourseServices.getAllCoursesFromDB();
  sendResponse(res, {
    statusCode: Number(httpStatus.ok),
    success: true,
    message: "Course  are retrieved successfully",
    data: courses,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const course = await CourseServices.getSingleCourseFromDB(id);
  sendResponse(res, {
    statusCode: Number(httpStatus.ok),
    success: true,
    message: "Course is retrieved successfully",
    data: course,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deletedCourse = await CourseServices.deleteCourseFromDB(id);
  sendResponse(res, {
    statusCode: Number(httpStatus.ok),
    success: true,
    message: "Course is deleted successfully",
    data: deletedCourse,
  });
});

export const CourseController = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  deleteCourse,
};
