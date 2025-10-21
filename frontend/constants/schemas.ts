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

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Required")
    .min(8, "Password is too short!")
    .max(20, "Password is too long!"),
});

export const registerSchema = Yup.object().shape({
  username: Yup.string()
    .required("Required")
    .min(2, "Too Short!")
    .max(20, "Too Long!"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Required")
    .min(8, "Password is too short!")
    .max(20, "Password is too long!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
});

export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

export const checkOtpSchema = Yup.object().shape({
  code: Yup.string()
    .required("Required")
    .min(6, "Code must be 6 digits")
    .max(6, "Code must be 6 digits"),
});

export const changePasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required("Required")
    .min(8, "Password is too short!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Required"),
});
