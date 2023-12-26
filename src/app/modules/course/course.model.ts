import { Schema, model } from "mongoose";
import TCourse from "./course.interface";

export const TCourseTags = [
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
];

export const TCourseDetails = {
  level: {
    type: String,
    required: [true, "Level is required "],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
};

const CourseSchema = new Schema<TCourse>({
  title: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Title is required and unique` too"],
  },
  instructor: {
    type: String,
    required: [true, "Instructor is required"],
    trim: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  tags: TCourseTags,
  startDate: {
    type: String,
    required: [true, "Start Date is required"],
  },
  endDate: {
    type: String,
    required: [true, "End Date is required"],
  },
  language: {
    type: String,
    required: [true, "Language is required"],
  },
  provider: {
    type: String,
    required: [true, "Provider is required"],
  },
  durationInWeeks: {
    type: Number,
    required: [true, "Duration In Weeks is required"],
  },
  details: TCourseDetails,
});

export const Course = model<TCourse>("Course", CourseSchema);
