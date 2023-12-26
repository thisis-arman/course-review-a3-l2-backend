import { z } from "zod";

const createCategoryValidation = z.object({
  body: z.object({
    name: z.string(),
  }),
});
const updateCategoryValidation = z.object({
  name: z.string(),
});

export const categoryValidations = {
  createCategoryValidation,
  updateCategoryValidation,
};
