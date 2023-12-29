/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from "../../errors/AppError";
import { CourseQuery } from "../../interface/queryTypes";
import { Review } from "../review/review.model";
import TCourse from "./course.interface";
import { Course } from "./course.model";

const createCourseIntoDB = async (payload: TCourse) => {
  console.log({ payload });
  const result = await Course.create(payload);
  return result;
};
const getAllCoursesFromDB = async (query: CourseQuery) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "startDate",
    sortOrder = "asc",
    minPrice,
    maxPrice,
    tags,
    startDate,
    endDate,
    language,
    provider,
    durationInWeeks,
    level,
  } = query;

  const filters: Record<string, any> = {};

  // Apply filters
  if (minPrice !== undefined || maxPrice !== undefined) {
    filters.price = {};
    if (minPrice !== undefined) filters.price.$gte = minPrice;
    if (maxPrice !== undefined) filters.price.$lte = maxPrice;
  }

  if (tags) filters["tags.name"] = tags;

  if (startDate) filters.startDate = { $gte: startDate };
  if (endDate) filters.endDate = { $lte: endDate };

  if (language) filters.language = language;
  if (provider) filters.provider = provider;

  if (durationInWeeks !== undefined) filters.durationInWeeks = durationInWeeks;

  if (level) filters["details.level"] = level;

  // Get total count of documents that match the filters
  const totalCount = await Course.countDocuments(filters);

  // Retrieve paginated data
  const result = await Course.find(filters)
    .populate({
      path: "createdBy",
      select: "_id username email role",
    })
    .sort({ [sortBy]: sortOrder === "desc" ? -1 : 1 })
    .skip((page - 1) * limit)
    .limit(limit);

  return {
    data: result,
    meta: {
      page,
      limit,
      total: totalCount,
    },
  };
};

// Get a single Course from database
const getSingleCourseFromDB = (id: string) => {
  const result = Course.findById(id);
  return result;
};

// it will make isDeleted field true
const deleteCourseFromDB = (id: string) => {
  const result = Course.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    }
  );
  return result;
};

const getSingleCourseReviewFromDB = async (id: string) => {
  const singleCourse = await Course.findById(id);
  const findReview = await Review.find({ courseId: id });

  return {
    course: singleCourse,
    reviews: [findReview],
  };
};

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

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
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
};

const getBestCoursesFromDB = async () => {
  console.log("Getting best courses");
  try {
    const bestCourse = await Course.aggregate([
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
  } catch (error) {
    throw new AppError(500, "Internal Server Error");
  }
};

export const CourseServices = {
  createCourseIntoDB,
  getSingleCourseFromDB,
  getAllCoursesFromDB,
  getSingleCourseReviewFromDB,
  deleteCourseFromDB,
  updateCourseIntoDB,
  getBestCoursesFromDB,
};
