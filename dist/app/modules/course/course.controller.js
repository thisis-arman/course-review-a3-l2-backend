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
exports.CourseController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const course_service_1 = require("./course.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const createCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const result = yield course_service_1.CourseServices.createCourseIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Course created successfully",
        data: result,
    });
}));
const getAllCourses = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield course_service_1.CourseServices.getAllCoursesFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Course  are retrieved successfully",
        data: courses,
    });
}));
const getSingleCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const course = yield course_service_1.CourseServices.getSingleCourseFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Course is retrieved successfully",
        data: course,
    });
}));
const getBestCourses = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Getting courses", req.body);
    const result = yield course_service_1.CourseServices.getBestCoursesFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Best course retrieved successfully",
        data: result,
    });
}));
const getSingleCourseReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const getCourse = yield course_service_1.CourseServices.getSingleCourseReviewFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Course is retrieve  successfully with review",
        data: getCourse,
    });
}));
const deleteCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedCourse = yield course_service_1.CourseServices.deleteCourseFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: Number(http_status_1.default.ok),
        success: true,
        message: "Course is deleted successfully",
        data: deletedCourse,
    });
}));
const updateCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const courseInfo = req.body;
    const updatedCourseInfo = yield course_service_1.CourseServices.updateCourseIntoDB(id, courseInfo);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Course updated successfully",
        data: updatedCourseInfo,
    });
}));
exports.CourseController = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    getSingleCourseReview,
    deleteCourse,
    updateCourse,
    getBestCourses,
};
