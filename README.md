# Course Review Application

This is a web application that allows users to review courses. It provides APIs for managing categories, courses, and reviews. The goal of this project is to help users make informed decisions about which courses to take.

## Features

- **Course Browsing**: Users can browse and search for courses. Each course includes details such as the instructor, price, start and end dates, language, provider, and duration.

- **Course Reviews**: Users can leave reviews for courses they've taken. Each review includes a rating and a text comment.

- **Best Course Highlight**: The application highlights the best-rated course based on user reviews.

- **Course Management**: The application provides APIs for creating, updating, and deleting courses.

- **Category Management**: The application provides APIs for managing course categories.

## Technologies Used

- Express.js: A web application framework for Node.js used for building the server-side application.
- MongoDB: A NoSQL database used for storing course, category, and review data.
- Mongoose: An Object Data Modeling (ODM) library for MongoDB used for interacting with the database.
- TypeScript: A typed superset of JavaScript used for writing the server-side code.
- Zod: A TypeScript-first schema validation library used for validating request data.
- ESLint: A JavaScript linter used for code quality and style enforcement.
- Prettier: A code formatter used for maintaining consistent code style.

## Getting Started

1. Clone the repository to your local machine.
2. Run `npm install` to install all the dependencies.
3. Create a `.env` file in the root directory and add your MongoDB connection string.
4. Run `npm run start` to start the development server.
5. Run `npm run build` to compile the TypeScript code into JavaScript.
6. Run `npm run prod` to start the production server.

## API Endpoints

### Course Endpoints

- `GET /course`: Get all courses.
- `GET /course/best`: Get the best-rated course.
- `GET /course/:id`: Get a single course by its id.
- `POST /course`: Create a new course.
- `PUT /course/:id`: Update a course by its id.
- `DELETE /course/:id`: Delete a course by its id.

### Review Endpoints

- `GET /reviews`: Get all reviews.
- `GET /review/:id`: Get a single review by its id.
- `POST /reviews`: Create a new review.
- `PUT /review/:id`: Update a review by its id.
- `DELETE /review/:id`: Delete a review by its id.

### Category Endpoints

- `GET /categories`: Get all categories.
- `GET /category/:id`: Get a single category by its id.
- `POST /categories`: Create a new category.
- `PUT /category/:id`: Update a category by its id.
- `DELETE /category/:id`: Delete a category by its id.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Links
[course-review-l2-a3-vercel.app](https://course-review-l2-a3-mauve.vercel.app/)