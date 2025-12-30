import * as Yup from "yup";

export interface Post {
  id: number;
  title: string;
  body: string;
}

export const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Minimum 3 characters")
    .max(50, "Maximum 50 characters")
    .required("Title is required"),
  body: Yup.string().max(500, "Maximum 500 characters"),
});
