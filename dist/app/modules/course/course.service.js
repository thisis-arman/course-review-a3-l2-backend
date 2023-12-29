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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const AppError_1 = __importDefault(require("../../errors/AppError"));
const review_model_1 = require("../review/review.model");
const course_model_1 = require("./course.model");
const createCourseIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ payload });
    const result = yield course_model_1.Course.create(payload);
    return result;
});
const getAllCoursesFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ query });
    const { page = 1, limit = 10, sortBy = "startDate", sortOrder = "asc", minPrice, maxPrice, tags, startDate, endDate, language, provider, durationInWeeks, level, } = query;
    const filters = {};
    // Apply filters
    if (minPrice !== undefined || maxPrice !== undefined) {
        filters.price = {};
        if (minPrice !== undefined)
            filters.price.$gte = minPrice;
        if (maxPrice !== undefined)
            filters.price.$lte = maxPrice;
    }
    if (tags)
        filters["tags.name"] = tags;
    if (startDate)
        filters.startDate = { $gte: startDate };
    if (endDate)
        filters.endDate = { $lte: endDate };
    if (language)
        filters.language = language;
    if (provider)
        filters.provider = provider;
    if (durationInWeeks !== undefined)
        filters.durationInWeeks = durationInWeeks;
    if (level)
        filters["details.level"] = level;
    console.log({ filters });
    // Get total count of documents that match the filters
    const totalCount = yield course_model_1.Course.countDocuments(filters);
    console.log({ totalCount });
    // Retrieve paginated data
    const result = yield course_model_1.Course.find(filters)
        .populate("categoryId")
        .sort({ [sortBy]: sortOrder === "desc" ? -1 : 1 })
        .skip((page - 1) * limit)
        .limit(limit);
    console.log({ result });
    return {
        data: result,
        meta: {
            page,
            limit,
            total: totalCount,
        },
    };
});
// Get a single Course from database
const getSingleCourseFromDB = (id) => {
    const result = course_model_1.Course.findById(id);
    return result;
};
// it will make isDeleted field true
const deleteCourseFromDB = (id) => {
    const result = course_model_1.Course.findByIdAndUpdate(id, {
        isDeleted: true,
    }, {
        new: true,
    });
    return result;
};
const getSingleCourseReviewFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const singleCourse = yield course_model_1.Course.findById(id);
    const findReview = yield review_model_1.Review.find({ courseId: id });
    return {
        course: singleCourse,
        reviews: [findReview],
    };
});
/* const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { tags, details, ...remainingCourseInfo } = payload;
  const modifiedCourse: Record<string, unknown> = {
    ...remainingCourseInfo,
  };

  // const tags = tags?.map((tag) => tag.isDeleted);

  if (tags && Object.keys(tags).length) {
    for (const [key, value] of Object.entries(tags)) {
      modifiedCourse[`tags.${key}`] = value;
    }
  }
  if (details && Object.keys(details).length) {
    for (const [key, value] of Object.entries(details)) {
      modifiedCourse[`details.${key}`] = value;
    }
  }

  console.log({ modifiedCourse });

  const updatedCourse = await Course.findByIdAndUpdate(id, modifiedCourse, {
    new: true,
    runValidators: true,
  });
  console.log({ updatedCourse });
  return updatedCourse;
}; */
const updateCourseIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { tags, details } = payload, remainingCourseInfo = __rest(payload, ["tags", "details"]);
    const modifiedCourse = Object.assign({}, remainingCourseInfo);
    // const tags = tags?.map((tag) => tag.isDeleted);
    if (tags && Object.keys(tags).length) {
        for (const [key, value] of Object.entries(tags)) {
            modifiedCourse[`tags.${key}`] = value;
        }
    }
    if (details && Object.keys(details).length) {
        for (const [key, value] of Object.entries(details)) {
            modifiedCourse[`details.${key}`] = value;
        }
    }
    console.log({ modifiedCourse });
    const updatedCourse = yield course_model_1.Course.findByIdAndUpdate(id, modifiedCourse, {
        new: true,
        runValidators: true,
    });
    console.log({ updatedCourse });
    return updatedCourse;
});
const getBestCoursesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Getting best courses");
    try {
        const bestCourse = yield course_model_1.Course.aggregate([
            {
                $lookup: {
                    from: "reviews",
                    localField: "_id",
                    foreignField: "courseId",
                    as: "reviews",
                },
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    instructor: 1,
                    categoryId: 1,
                    price: 1,
                    tags: 1,
                    startDate: 1,
                    endDate: 1,
                    language: 1,
                    provider: 1,
                    durationInWeeks: 1,
                    details: 1,
                    averageRating: { $avg: "$reviews.rating" },
                    reviewCount: { $size: "$reviews" },
                },
            },
            { $sort: { averageRating: -1 } },
            { $limit: 1 },
        ]);
        console.log({ bestCourse });
        if (!bestCourse || bestCourse.length === 0) {
            return {
                success: false,
                statusCode: 404,
                message: "No courses found",
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: "Best course retrieved successfully",
            data: {
                course: bestCourse[0],
            },
        };
    }
    catch (error) {
        throw new AppError_1.default(500, "Internal Server Error");
    }
});
exports.CourseServices = {
    createCourseIntoDB,
    getSingleCourseFromDB,
    getAllCoursesFromDB,
    getSingleCourseReviewFromDB,
    deleteCourseFromDB,
    updateCourseIntoDB,
    getBestCoursesFromDB,
};
