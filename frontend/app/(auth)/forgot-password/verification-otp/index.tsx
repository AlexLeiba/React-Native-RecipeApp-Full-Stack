import { ThemedView } from "@/components/themed-view";
import { H1, H2, Paragraph } from "@/components/typography/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { checkOtpSchema } from "@/constants/schemas";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import React from "react";
import { StyleSheet, View } from "react-native";

function VerificationOtpPage() {
  const router = useRouter();
  return (
    <ThemedView style={styles.container}>
      <H1>Code validation</H1>

      <Formik
        onSubmit={(values) => {
          console.log("code", values);
          router.push("/forgot-password/verification-otp/reset-password");
        }}
        validationSchema={checkOtpSchema}
        initialValues={{ code: "" }}
      >
        {({ handleChange, handleSubmit, values, errors }) => {
          return (
            <View style={styles.inputsContainer}>
              <Input
                placeholder="Type verification code here"
                label="Verification Code"
                handleChange={handleChange("code")}
                value={values.code}
                errorMessage={errors.code}
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
                <H2 style={{ color: "black" }}>Submit</H2>
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
