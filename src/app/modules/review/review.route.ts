import express from "express";
import validateRequest from "../../middleware/validateRequest";

import { reviewValidations } from "./review.validation";
import { ReviewController } from "./review.controller";

const router = express.Router();

router.get("/reviews", ReviewController.getAllReviews);
router.post(
  "/reviews",
  validateRequest(reviewValidations.createReviewValidationSchema),
  ReviewController.createReview
);
router.get("/reviews/:id", ReviewController.getSingleReview);
router.delete("/reviews/:id", ReviewController.deleteReview);
// router.patch("/:studentId", ReviewController.);
// router.patch("/:studentId", ReviewController.);

export const ReviewRoutes = router;
