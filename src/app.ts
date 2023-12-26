import cors from "cors";
import express, { Application } from "express";
// import { CourseRoutes } from "./app/modules/course/course.route";
import router from "./app/routes";
import globalErrorHandler from "./app/middleware/globalErrorHandler";

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// const router = Router()

// application routes
app.use("/api", router);

app.use(globalErrorHandler);

export default app;
