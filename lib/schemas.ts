import { z } from "zod";

const titleRequiredMsg = "Title is required";
const titleMaxLengthMsg = "Title must be less than 100 characters";
const descriptionRequiredMsg = "Description is required";

export const newPostSchema = z.object({
  title: z.string().min(1, { message: titleRequiredMsg }).max(100, {
    message: titleMaxLengthMsg,
  }),
  description: z.string().min(1, { message: descriptionRequiredMsg }),
});

export const editTitleSchema = z
  .string()
  .min(1, {
    message: titleRequiredMsg,
  })
  .max(100, {
    message: titleMaxLengthMsg,
  });

export const editDescriptionSchema = z
  .string()
  .min(1, { message: descriptionRequiredMsg });
