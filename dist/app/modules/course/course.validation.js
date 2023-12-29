"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseValidations = void 0;
const zod_1 = require("zod");
const CourseTag = zod_1.z.object({
    name: zod_1.z.string(),
    isDeleted: zod_1.z.boolean().default(false),
});
const CourseDetails = zod_1.z.object({
    level: zod_1.z.string(),
    description: zod_1.z.string(),
});
const createCourseValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        instructor: zod_1.z.string(),
        categoryId: zod_1.z.string(),
        price: zod_1.z.number(),
        tags: zod_1.z.array(CourseTag),
        startDate: zod_1.z.string(),
        endDate: zod_1.z.string(),
        language: zod_1.z.string(),
        provider: zod_1.z.string(),
        // durationInWeeks: z.number(),
        details: CourseDetails,
    }),
});
const updateCourseTag = zod_1.z.object({
    name: zod_1.z.string().optional(),
    isDeleted: zod_1.z.boolean().default(false),
});
const updateCourseDetails = zod_1.z.object({
    level: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
});
const updateCourseValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        instructor: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        tags: zod_1.z.array(updateCourseTag).optional(),
        startDate: zod_1.z.string().optional(),
        endDate: zod_1.z.string().optional(),
        language: zod_1.z.string().optional(),
        provider: zod_1.z.string().optional(),
        // durationInWeeks: z.number().optional(),
        details: updateCourseDetails.optional(),
    }),
});
exports.courseValidations = {
    createCourseValidation,
    updateCourseValidation,
};
