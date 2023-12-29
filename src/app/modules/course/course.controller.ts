import { RequestHandler } from "express";
import httpStatus from "http-status";
import { CourseServices } from "./course.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const createCourse: RequestHandler = catchAsync(async (req, res) => {
  console.log(req.body);
  const result = await CourseServices.createCourseIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Course created successfully",
    data: result,
  });
});

const getAllCourses: RequestHandler = catchAsync(async (req, res) => {
  const courses = await CourseServices.getAllCoursesFromDB(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Course  are retrieved successfully",
    data: courses,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const course = await CourseServices.getSingleCourseFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Course is retrieved successfully",
    data: course,
  });
});

const getBestCourses = catchAsync(async (req, res) => {
  console.log("Getting courses", req.body);
  const result = await CourseServices.getBestCoursesFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Best course retrieved successfully",
    data: result,
  });
});

const getSingleCourseReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const getCourse = await CourseServices.getSingleCourseReviewFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Course is retrieve  successfully with review",
    data: getCourse,
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

const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const courseInfo = req.body;
  const updatedCourseInfo = await CourseServices.updateCourseIntoDB(
    id,
    courseInfo
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Course updated successfully",
    data: updatedCourseInfo,
  });
});

export const CourseController = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  getSingleCourseReview,
  deleteCourse,
  updateCourse,
  getBestCourses,
};
