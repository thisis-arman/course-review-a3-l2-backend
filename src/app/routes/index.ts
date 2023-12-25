import { Router } from "express";

const router = Router();

const moduleRoutes = [
  {
    path: "/courses",
    route: UserRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
