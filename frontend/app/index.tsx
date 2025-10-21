import { ThemedView } from "@/components/themed-view";
import { H1, H2, Paragraph } from "@/components/typography/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Formik } from "formik";
import { loginSchema } from "@/constants/schemas";
import { Toast } from "toastify-react-native";
import { useAuth } from "@/context/AuthContext";

function SignInPage() {
  const router = useRouter();
  const { handleSignIn } = useAuth();

  return (
    <ThemedView style={styles.container}>
      <H1>Sign In</H1>

      <Formik
        validationSchema={loginSchema}
        initialValues={{ email: "", password: "" }}
        onSubmit={
          (values) => {
            console.log("values", values);

            Toast.success("Login successful");
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
                label="Email"
                handleChange={handleChange("email")}
                value={values.email}
                errorMessage={errors.email}
              />

              <Input
                label="Password"
                handleChange={handleChange("password")}
                value={values.password}
                errorMessage={errors.password}
              />
              <View>
                <Button
                  type="ghost"
                  handlePress={() => router.push("/sign-up")}
                >
                  <Paragraph>Dont have an account</Paragraph>
                  <Paragraph>Sign up</Paragraph>
                </Button>
                <Button
                  type="ghost"
                  handlePress={() => router.push("/forgot-password")}
                >
                  <Paragraph>Forgot password</Paragraph>
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
});

export default SignInPage;
