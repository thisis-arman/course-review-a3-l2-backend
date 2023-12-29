"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = exports.TCourseDetails = exports.TCourseTags = void 0;
const mongoose_1 = require("mongoose");
exports.TCourseTags = [
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
        _id: false,
    },
];
exports.TCourseDetails = {
    level: {
        type: String,
        required: [true, "Level is required "],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
};
const CourseSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
    },
    tags: exports.TCourseTags,
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
    /*  durationInWeeks: {
      type: Number,
      required: [true, "Duration In Weeks is required"],
    }, */
    details: exports.TCourseDetails,
}, {
    toJSON: {
        virtuals: true,
    },
});
CourseSchema.virtual("durationInWeeks").get(function () {
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    // Calculate the duration in milliseconds
    const durationInMilliseconds = Number(end) - Number(start);
    // Convert milliseconds to weeks and round up to the nearest integer
    const durationInWeeks = Math.ceil(durationInMilliseconds / (7 * 24 * 60 * 60 * 1000));
    return durationInWeeks;
});
exports.Course = (0, mongoose_1.model)("Course", CourseSchema);
