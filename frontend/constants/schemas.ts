import * as Yup from "yup";
import { useTranslation } from "react-i18next";

function useNewRecipeSchema() {
  const { t } = useTranslation();

  return Yup.object().shape({
    title: Yup.string()
      .min(2, t("newRecipePage.form.validation.required"))
      .max(50, t("newRecipePage.form.validation.tooLong"))
      .required("Required"),
    description: Yup.string()
      .optional()
      .min(2, t("newRecipePage.form.validation.tooShort"))
      .max(50, t("newRecipePage.form.validation.tooLong")),
    image: Yup.string().optional(),

    ingredients: Yup.string().required(
      t("newRecipePage.form.validation.required")
    ),
    servings: Yup.number()
      .required(t("newRecipePage.form.validation.required"))
      .min(1, t("newRecipePage.form.validation.required")),
    timeToCook: Yup.number()
      .required(t("newRecipePage.form.validation.required"))
      .min(1, t("newRecipePage.form.validation.required")),
    calories: Yup.number().optional(),
    temperature: Yup.number().optional(),

    category: Yup.string().required(
      t("newRecipePage.form.validation.required")
    ),
    link: Yup.boolean().optional(),
    linkName: Yup.string().optional(),
    linkUrl: Yup.string().optional(),
  });
}

function useLoginSchema() {
  const { t } = useTranslation();

  return Yup.object().shape({
    email: Yup.string()
      .email(t("signInPage.invalidEmail"))
      .required(t("signInPage.required")),
    password: Yup.string()
      .required(t("signInPage.required"))
      .min(8, t("signInPage.passwordTooShort"))
      .max(20, t("signInPage.passwordTooLong")),
  });
}

function useRegisterSchema() {
  const { t } = useTranslation();

  return Yup.object().shape({
    username: Yup.string()
      .required(t("signUpPage.required"))
      .min(2, t("signUpPage.passwordTooShort"))
      .max(20, t("signUpPage.passwordTooLong")),
    email: Yup.string()
      .email(t("signUpPage.invalidEmail"))
      .required(t("signUpPage.required")),
    password: Yup.string()
      .required(t("signUpPage.required"))
      .min(8, t("signUpPage.passwordTooShort"))
      .max(20, t("signUpPage.passwordTooLong")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], t("signUpPage.passwordsDoNotMatch"))
      .required(t("signUpPage.required")),
  });
}

function useForgotPasswordSchema() {
  const { t } = useTranslation();

  return Yup.object().shape({
    email: Yup.string()
      .email(t("forgotPasswordPage.invalidEmail"))
      .required(t("forgotPasswordPage.required")),
  });
}

function useCheckOtpSchema() {
  const { t } = useTranslation();

  return Yup.object().shape({
    code: Yup.string()
      .required(t("forgotPasswordPage.required"))
      .min(6, t("forgotPasswordPage.codeMustBeSixDigits"))
      .max(6, t("forgotPasswordPage.codeMustBeSixDigits")),
  });
}

function useChangePasswordSchema() {
  const { t } = useTranslation();

  return Yup.object().shape({
    newPassword: Yup.string()
      .required(t("forgotPasswordPage.required"))
      .min(8, t("forgotPasswordPage.passwordTooShort"))
      .max(20, t("forgotPasswordPage.passwordTooLong")),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("newPassword")],
        t("forgotPasswordPage.passwordsDoNotMatch")
      )
      .required(t("forgotPasswordPage.required")),
  });
}

export function useSchemas() {
  const loginSchema = useLoginSchema();
  const registerSchema = useRegisterSchema();
  const forgotPasswordSchema = useForgotPasswordSchema();
  const checkOtpSchema = useCheckOtpSchema();
  const changePasswordSchema = useChangePasswordSchema();
  const newRecipeSchema = useNewRecipeSchema();

  return {
    loginSchema,
    registerSchema,
    forgotPasswordSchema,
    checkOtpSchema,
    changePasswordSchema,
    newRecipeSchema,
  };
}
