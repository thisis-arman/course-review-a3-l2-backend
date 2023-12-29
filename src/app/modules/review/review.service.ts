import TReview from "./review.interface";
import { Review } from "./review.model";

const createReviewIntoDB = async (payload: TReview) => {
  const result = await Review.create(payload);
  return result;
};

const getAllReviewsFromDB = async () => {
  const result = await Review.find();
  return result;
};

const getSingleReviewFromDB = async (id: string) => {
  const result = await Review.findById(id).populate("courseId");
  return result;
};

const deleteReviewFromDB = async (id: string) => {
  const result = await Review.findByIdAndUpdate(
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

export const ReviewServices = {
  createReviewIntoDB,
  getSingleReviewFromDB,
  getAllReviewsFromDB,
  deleteReviewFromDB,
};
