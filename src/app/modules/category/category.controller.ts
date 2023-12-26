import { RequestHandler } from "express";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { CategoryServices } from "./category.service";

const createCategory: RequestHandler = catchAsync(async (req, res) => {
  const result = await CategoryServices.createCategoryIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Category created successfully",
    data: result,
  });
});

const getAllCategories: RequestHandler = catchAsync(async (req, res) => {
  const courses = await CategoryServices.getAllCategoriesFromDB();
  sendResponse(res, {
    statusCode: Number(httpStatus.ok),
    success: true,
    message: "Categories  are retrieved successfully",
    data: courses,
  });
});

const getSingleCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const course = await CategoryServices.getSingleCategoryFromDB(id);
  sendResponse(res, {
    statusCode: Number(httpStatus.ok),
    success: true,
    message: "Category is retrieved successfully",
    data: course,
  });
});

const deleteCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deletedCategory = await CategoryServices.deleteCategoryFromDB(id);
  sendResponse(res, {
    statusCode: Number(httpStatus.ok),
    success: true,
    message: "Category is deleted successfully",
    data: deletedCategory,
  });
});

export const CategoryController = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  deleteCategory,
};
