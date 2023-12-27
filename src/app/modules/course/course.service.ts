import { Review } from "../review/review.model";
import TCourse from "./course.interface";
import { Course } from "./course.model";

const createCourseIntoDB = async (payload: TCourse) => {
  console.log({ payload });
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const queryObj = { ...query };

  const excludeField = ["tags", "limit", "page", "sort", "language"];
  excludeField.forEach((element) => delete queryObj[element]);

  const filterQuery = Course.find(queryObj).populate("categoryId");

  const filterByLanguage = Course.find([
    { $match: { language: query.language } },
  ]);

  console.log({ filterByLanguage });

  const findCourseByTags = await filterQuery.find({
    tags: { $elemMatch: { name: query.tags } },
  });

  let limit = 1;
  let skip = 0;
  let page = 1;

  if (query?.page) {
    page = query.page as number;
  }

  if (query?.limit) {
    limit = query.limit as number;
    skip = (page - 1) * limit;
  }

  // const paginateQuery = await filterQuery.skip(skip);

  return findCourseByTags;
};

const getSingleCourseFromDB = (id: string) => {
  const result = Course.findById(id);
  return result;
};

const deleteCourseFromDB = (id: string) => {
  const result = Course.findByIdAndUpdate(
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

const getSingleCourseReviewFromDB = async (id: string) => {
  const singleCourse = await Course.findById(id);
  const findReview = await Review.find({ courseId: id });

  return {
    course: singleCourse,
    reviews: [findReview],
  };
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { tags, details, ...remainingCourseInfo } = payload;
  const modifiedCourse: Record<string, unknown> = {
    ...remainingCourseInfo,
  };

  // const tags = tags?.map((tag) => tag.isDeleted);

  if (tags && Object.keys(tags).length) {
    for (const [key, value] of Object.entries(tags)) {
      modifiedCourse[`tags.${key}`] = value;
    }
  }
  if (details && Object.keys(details).length) {
    for (const [key, value] of Object.entries(details)) {
      modifiedCourse[`details.${key}`] = value;
    }
  }

  console.log({ modifiedCourse });

  const updatedCourse = await Course.findByIdAndUpdate(id, modifiedCourse, {
    new: true,
    runValidators: true,
  });
  console.log({ updatedCourse });
  return updatedCourse;
};

/* const getBestCourses =async()=>{
  
  const Courses = await Course.find()
  const bestCourses = Courses.
}  */

/* 
const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  const queryObj = { ...query };
  let searchTerm = "";
  const studentSearchableFields = ["email", "name.firstName", "presentAddress"];
  // Searching for all students in the database
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }

  const searchQuery = Student.find({
    $or: studentSearchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: "i" },
    })),
  });

  const excludeField = ["searchTerm", "sort", "page", "limit", "fields"];
  excludeField.forEach((element) => delete queryObj[element]);

  console.log({ query }, { queryObj });

  const filterQuery = searchQuery
    .find(queryObj)
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  /* 
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    }); 

  let sort = "-createdAt";

  if (query.sort) {
    sort = query.sort as string;
  }

  const sortQuery = filterQuery.sort(sort);

  let limit = 1;
  let skip = 0;
  let page = 0;

  if (query?.limit) {
    limit = query.limit as number;
  }

  if (query?.page) {
    page = Number(query.page);
    skip = (page - 1) * limit;
  }

  const paginateQuery = sortQuery.skip(skip);
  const limitQuery = paginateQuery.limit(limit);

  let fields = "-__v";

  if (query.fields) {
    fields = (query.fields as string).split(",").join(" ");
    console.log({ fields });
  }

  const fieldQuery = await limitQuery.select(fields);

  return fieldQuery;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  console.log({ payload });

  const { name, guardian, localGuardian, ...remainingStudentData } = payload;
  const modifiedStudent: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedStudent[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedStudent[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedStudent[`localGuardian.${key}`] = value;
    }
  }
  console.log({ modifiedStudent });

  const result = await Student.findOneAndUpdate({ id }, modifiedStudent, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student");
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user");
    }

    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    await session.endSession();
  }
}; */

export const CourseServices = {
  createCourseIntoDB,
  getSingleCourseFromDB,
  getAllCoursesFromDB,
  getSingleCourseReviewFromDB,
  deleteCourseFromDB,
  updateCourseIntoDB,
};
