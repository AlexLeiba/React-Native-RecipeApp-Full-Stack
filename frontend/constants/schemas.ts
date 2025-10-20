import * as Yup from "yup";

export const newRecipeSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  description: Yup.string()
    .optional()
    .min(2, "Too Short!")
    .max(50, "Too Long!"),
  image: Yup.string().optional(),

  ingredients: Yup.string().required("Required"),
  servings: Yup.number().required("Required").min(1, "Required"),
  timeToCook: Yup.number().required("Required").min(1, "Required"),
  calories: Yup.number().optional(),
  temperature: Yup.number().optional(),

  category: Yup.string().required("Required"),
  link: Yup.boolean().optional(),
  linkName: Yup.string().optional(),
  linkUrl: Yup.string().optional(),
});
