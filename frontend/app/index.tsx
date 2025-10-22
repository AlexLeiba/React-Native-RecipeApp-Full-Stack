import { ThemedView } from "@/components/themed-view";
import { H1, H2, Paragraph } from "@/components/typography/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Formik } from "formik";

// import { Toast } from "toastify-react-native";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "react-i18next";
import { useSchemas } from "@/constants/schemas";
import { LanguageDropdown } from "@/components/Language/LanguageDropdown";

function SignInPage() {
  const { t } = useTranslation();
  const { loginSchema } = useSchemas();
  const router = useRouter();
  const { handleSignIn } = useAuth();

  return (
    <ThemedView style={styles.container}>
      <View style={styles.languagesContainer}>
        <LanguageDropdown />
      </View>
      <H1>{t("signInPage.title")}</H1>

      <Formik
        validationSchema={loginSchema}
        initialValues={{ email: "", password: "" }}
        onSubmit={
          (values) => {
            console.log("values", values);

            // TODO send data from Backend to handleSignIn
            handleSignIn({
              username: "username",
              email: "email@gmail.com",
              accessToken: "token",
              avatar: "",
              roles: { user: "user" },
            });

            router.push("/dashboard");
          }
          //TODO; request with credentials
        }
      >
        {({ handleSubmit, handleChange, values, errors }) => {
          return (
            <View style={styles.inputsContainer}>
              <Input
                label={t("signInPage.email")}
                handleChange={handleChange("email")}
                value={values.email}
                errorMessage={errors.email}
                placeholder={t("signInPage.emailPlaceholder")}
              />

              <Input
                label={t("signInPage.password")}
                handleChange={handleChange("password")}
                value={values.password}
                errorMessage={errors.password}
                placeholder={t("signInPage.passwordPlaceholder")}
              />
              <View>
                <Button
                  type="ghost"
                  handlePress={() => router.push("/sign-up")}
                >
                  <Paragraph>{t("signInPage.doNotHaveAnAccount")}</Paragraph>
                </Button>
                <Button
                  type="ghost"
                  handlePress={() => router.push("/forgot-password")}
                >
                  <Paragraph>{t("signInPage.forgotPassword")}</Paragraph>
                </Button>
              </View>

              <Button type="secondary" handlePress={handleSubmit}>
                <H2 style={{ color: "black" }}>{t("signInPage.submit")}</H2>
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
  languagesContainer: {
    position: "absolute",
    top: 20,
    right: 0,
  },
});

export default SignInPage;
