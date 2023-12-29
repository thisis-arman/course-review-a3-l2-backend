"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewValidations = void 0;
const zod_1 = require("zod");
const createReviewValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        courseId: zod_1.z.string(),
        rating: zod_1.z.number().min(1).max(5),
        review: zod_1.z.string(),
    }),
});
const updateReviewValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        courseId: zod_1.z.string(),
        rating: zod_1.z.number().min(1).max(5),
        review: zod_1.z.string(),
    }),
});
exports.reviewValidations = {
    createReviewValidationSchema,
    updateReviewValidationSchema,
};
