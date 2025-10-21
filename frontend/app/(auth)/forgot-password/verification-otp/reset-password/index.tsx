import { ThemedView } from "@/components/themed-view";
import { H1, H2, Paragraph } from "@/components/typography/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { changePasswordSchema } from "@/constants/schemas";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import React from "react";
import { StyleSheet, View } from "react-native";

function ResetPasswordPage() {
  const router = useRouter();
  return (
    <ThemedView style={styles.container}>
      <H1>Reset Password</H1>

      <Formik
        onSubmit={(values) => {
          console.log("email", values);
          router.push("/");
        }}
        validationSchema={changePasswordSchema}
        initialValues={{ newPassword: "", confirmPassword: "" }}
      >
        {({ handleChange, handleSubmit, values, errors }) => {
          return (
            <View style={styles.inputsContainer}>
              <Input
                inputType="password"
                label="New Password"
                handleChange={handleChange("newPassword")}
                value={values.newPassword}
                placeholder="Type new password"
                errorMessage={errors.newPassword}
              />
              <Input
                inputType="password"
                label="Confirm Password"
                handleChange={handleChange("confirmPassword")}
                value={values.confirmPassword}
                placeholder="Confirm password"
                errorMessage={errors.confirmPassword}
              />

              <View style={styles.linkContainer}>
                <Button
                  type="ghost"
                  handlePress={() => router.push("/sign-up")}
                >
                  <Paragraph>Sign up</Paragraph>
                </Button>
                <Button
                  type="ghost"
                  handlePress={() => router.push("/sign-up")}
                >
                  <Paragraph>Sign in</Paragraph>
                </Button>
              </View>
              <Button type="secondary" handlePress={handleSubmit}>
                <H2 style={{ color: "black" }}>Send email</H2>
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

export default ResetPasswordPage;
