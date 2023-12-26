import { RequestHandler } from "express";
// import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { ReviewServices } from "./review.service";

const createReview: RequestHandler = catchAsync(async (req, res) => {
  const result = await ReviewServices.createReviewIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Review created successfully",
    data: result,
  });
});

const getAllReviews: RequestHandler = catchAsync(async (req, res) => {
  const courses = await ReviewServices.getAllReviewsFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Categories  are retrieved successfully",
    data: courses,
  });
});

const getSingleReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const course = await ReviewServices.getSingleReviewFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Review is retrieved successfully",
    data: course,
  });
});

const deleteReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deletedReview = await ReviewServices.deleteReviewFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Review is deleted successfully",
    data: deletedReview,
  });
});

export const ReviewController = {
  createReview,
  getAllReviews,
  getSingleReview,
  deleteReview,
};
