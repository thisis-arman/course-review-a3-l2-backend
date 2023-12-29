"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const review_validation_1 = require("./review.validation");
const review_controller_1 = require("./review.controller");
const router = express_1.default.Router();
router.post("/reviews", (0, validateRequest_1.default)(review_validation_1.reviewValidations.createReviewValidationSchema), review_controller_1.ReviewController.createReview);
router.get("/reviews", review_controller_1.ReviewController.getAllReviews);
router.delete("/review/:id", review_controller_1.ReviewController.deleteReview);
router.get("/review/:id", review_controller_1.ReviewController.getSingleReview);
// router.patch("/:studentId", ReviewController.);
exports.ReviewRoutes = router;
