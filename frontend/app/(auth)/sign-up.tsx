import { ThemedView } from "@/components/themed-view";
import { H1, H2, Paragraph } from "@/components/typography/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Formik } from "formik";
import { useSchemas } from "@/constants/schemas";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/context/AuthContext";
import { apiFactory } from "@/api/apiFactory";
import { Toast } from "toastify-react-native";

function SignInPage() {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const { registerSchema } = useSchemas();
  const { t } = useTranslation();
  const { user } = useAuth();

  if (user?.accessToken) {
    router.push("/dashboard");
  }

  async function handleRegister(values: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    setLoading(true);
    try {
      const response = await apiFactory.register(values);

      Toast.success(response.message);
      router.push("/");
    } catch (error: any) {
      Toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <ThemedView style={styles.container}>
      <H1>{t("signUpPage.title")}</H1>

      <Formik
        validationSchema={registerSchema}
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={(values) => {
          handleRegister(values);
        }}
      >
        {({ handleBlur, handleSubmit, handleChange, values, errors }) => {
          return (
            <View style={styles.inputsContainer}>
              <Input
                label={t("signUpPage.username")}
                handleChange={handleChange("username")}
                value={values.username}
                placeholder={t("signUpPage.username")}
                errorMessage={errors.username}
              />
              <Input
                label={t("signUpPage.email")}
                handleChange={handleChange("email")}
                value={values.email}
                placeholder={t("signUpPage.email")}
                errorMessage={errors.email}
              />
              <Input
                label={t("signUpPage.password")}
                inputType="password"
                handleChange={handleChange("password")}
                value={values.password}
                placeholder={t("signUpPage.password")}
                errorMessage={errors.password}
              />
              <Input
                label={t("signUpPage.confirmPassword")}
                inputType="password"
                handleChange={handleChange("confirmPassword")}
                value={values.confirmPassword}
                placeholder={t("signUpPage.confirmPassword")}
                errorMessage={errors.confirmPassword}
              />

              <Button type="ghost" handlePress={() => router.push("/")}>
                <Paragraph>{t("signUpPage.alreadyHaveAnAccount")}</Paragraph>
              </Button>

              <Button
                type="secondary"
                handlePress={handleSubmit}
                disabled={loading}
                loading={loading}
              >
                <H2 style={{ color: "black" }}>{t("signUpPage.submit")}</H2>
              </Button>
            </View>
          );
        }}
      </Formik>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    height: "100%",
    justifyContent: "center",
    gap: 20,
  },
  inputsContainer: {
    width: "100%",
    flexDirection: "column",
    gap: 20,
  },
});

export default SignInPage;
