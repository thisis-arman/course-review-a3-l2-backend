import express from "express";
import validateRequest from "../../middleware/validateRequest";

import { reviewValidations } from "./review.validation";
import { ReviewController } from "./review.controller";

const router = express.Router();

router.post(
  "/reviews",
  validateRequest(reviewValidations.createReviewValidationSchema),
  ReviewController.createReview
);
router.get("/courses", ReviewController.getAllReviews);
router.delete("/:id", ReviewController.deleteReview);
router.get("/id", ReviewController.getSingleReview);
// router.patch("/:studentId", ReviewController.);

export const ReviewRoutes = router;
