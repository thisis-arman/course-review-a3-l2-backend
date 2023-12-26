import { z } from "zod";

const CourseTag = z.object({
  name: z.string(),
  isDeleted: z.boolean().default(false),
});

const CourseDetails = z.object({
  level: z.string(),
  description: z.string(),
});

const createCourseValidation = z.object({
  body: z.object({
    title: z.string(),
    instructor: z.string(),
    categoryId: z.string(),
    price: z.number(),
    tags: z.array(CourseTag),
    startDate: z.string(),
    endDate: z.string(),
    language: z.string(),
    provider: z.string(),
    durationInWeeks: z.number(),
    details: CourseDetails,
  }),
});

const updateCourseTag = z.object({
  name: z.string().optional(),
  isDeleted: z.boolean().default(false),
});

const updateCourseDetails = z.object({
  level: z.string().optional(),
  description: z.string().optional(),
});

const updateCourseValidation = z.object({
  title: z.string().optional(),
  instructor: z.string().optional(),
  price: z.number().optional(),
  tags: z.array(updateCourseTag),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  language: z.string().optional(),
  provider: z.string().optional(),
  durationInWeeks: z.number().optional(),
  details: updateCourseDetails,
});

export const courseValidations = {
  createCourseValidation,
  updateCourseValidation,
};
