import { ThemedView } from "@/components/themed-view";
import { H1, H2, Paragraph } from "@/components/typography/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Formik } from "formik";
import { registerSchema } from "@/constants/schemas";

function SignInPage() {
  const router = useRouter();
  return (
    <ThemedView style={styles.container}>
      <H1>Sign up</H1>

      <Formik
        validationSchema={registerSchema}
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={(values) => {
          console.log("values", values);
        }}
      >
        {({ handleBlur, handleSubmit, handleChange, values, errors }) => {
          return (
            <View style={styles.inputsContainer}>
              <Input
                label="Username"
                handleChange={handleChange("username")}
                value={values.username}
                placeholder="Type username"
                errorMessage={errors.username}
              />
              <Input
                label="Email"
                handleChange={handleChange("email")}
                value={values.email}
                placeholder="Type email"
                errorMessage={errors.email}
              />
              <Input
                inputType="password"
                label="Password"
                handleChange={handleChange("password")}
                value={values.password}
                placeholder="Type password"
                errorMessage={errors.password}
              />
              <Input
                inputType="password"
                label="Confirm Password"
                handleChange={handleChange("confirmPassword")}
                value={values.confirmPassword}
                placeholder="Confirm password"
                errorMessage={errors.confirmPassword}
              />

              <Button type="ghost" handlePress={() => router.push("/")}>
                <Paragraph>Already have an account?</Paragraph>
                <Paragraph>Sign in</Paragraph>
              </Button>

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
});

export default SignInPage;
