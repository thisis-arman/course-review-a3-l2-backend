import { Schema, model } from "mongoose";
import { TCategory } from "./category.interface";

const categorySchema = new Schema<TCategory>({
  name: String,
});

export const Category = model<TCategory>("Category", categorySchema);
