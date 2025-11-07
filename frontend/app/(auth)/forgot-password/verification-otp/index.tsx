import { apiFactory } from "@/api/apiFactory";
import { ThemedView } from "@/components/themed-view";
import { H1, H2, Paragraph } from "@/components/typography/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSchemas } from "@/constants/schemas";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Toast } from "toastify-react-native";

function VerificationOtpPage() {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const { checkOtpSchema } = useSchemas();
  const { t } = useTranslation();
  const { email } = useLocalSearchParams();

  async function handleVerifyOtp(values: { otp: string }) {
    setLoading(true);
    try {
      if (typeof email !== "string") {
        throw new Error("Invalid user credentials");
      }

      await apiFactory.checkOtpCode({ otp: values.otp, email });

      router.push(
        `/forgot-password/verification-otp/reset-password?email=${email}`
      );
    } catch (error: any) {
      Toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <ThemedView style={styles.container}>
      <H1>{t("forgotPasswordPage.codeVerificationTitle")}</H1>

      <Formik
        onSubmit={(values) => {
          handleVerifyOtp(values);
        }}
        validationSchema={checkOtpSchema}
        initialValues={{ otp: "" }}
      >
        {({ handleChange, handleSubmit, values, errors }) => {
          return (
            <View style={styles.inputsContainer}>
              <Input
                placeholder={t(
                  "forgotPasswordPage.verificationCodePlaceholder"
                )}
                label={t("forgotPasswordPage.verificationLabel")}
                handleChange={handleChange("otp")}
                value={values.otp}
                errorMessage={errors.otp}
              />

              <View style={styles.linkContainer}>
                <Button
                  type="ghost"
                  handlePress={() => router.push("/sign-up")}
                >
                  <Paragraph>{t("forgotPasswordPage.signUp")}</Paragraph>
                </Button>
                <Button
                  type="ghost"
                  handlePress={() => router.push("/sign-up")}
                >
                  <Paragraph>{t("forgotPasswordPage.signIn")}</Paragraph>
                </Button>
              </View>
              <Button
                type="secondary"
                handlePress={handleSubmit}
                loading={loading}
                disabled={loading}
              >
                <H2 style={{ color: "black" }}>
                  {t("forgotPasswordPage.submit")}
                </H2>
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
  linkContainer: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
  },
});

export default VerificationOtpPage;
