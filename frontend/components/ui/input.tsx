import { Eye, EyeClosed, Search, X } from "lucide-react-native";
import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import { ThemedView } from "../themed-view";
import { H3, Paragraph } from "../typography/typography";

type InputProps = {
  handleChange: (text: string) => void;
  handleClearInput?: () => void;
  value: string;
  errorMessage?: string;
  label?: string;
  inputType?: "search" | "password";
} & TextInputProps;
export const Input = ({
  handleChange,
  handleClearInput,
  value,
  errorMessage,
  label,
  inputType,
  ...rest
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(true);
  return (
    <ThemedView style={styles.container}>
      {label && <H3>{label}</H3>}

      {inputType === "search" && (
        <Search style={{ position: "absolute", left: 10, top: 10 }} />
      )}
      <TextInput
        secureTextEntry={inputType !== "password" ? false : showPassword}
        style={[
          styles.inputStyle,
          inputType === "search" && { paddingHorizontal: 40 },
        ]}
        placeholder="Name"
        value={value}
        onChangeText={handleChange}
        {...rest}
      />
      {inputType === "search" && value && (
        <TouchableOpacity
          onPress={handleClearInput}
          style={{
            position: "absolute",
            right: 5,
            top: 5,
            padding: 5,
            zIndex: 100,
          }}
        >
          <X />
        </TouchableOpacity>
      )}
      {inputType === "password" && showPassword && (
        <TouchableOpacity
          onPress={() => setShowPassword(false)}
          style={{
            position: "absolute",
            right: 5,
            top: 35,
            padding: 5,
            zIndex: 100,
          }}
        >
          <Eye />
        </TouchableOpacity>
      )}
      {inputType === "password" && !showPassword && (
        <TouchableOpacity
          onPress={() => setShowPassword(true)}
          style={{
            position: "absolute",
            right: 5,
            top: 35,
            padding: 5,
            zIndex: 100,
          }}
        >
          <EyeClosed />
        </TouchableOpacity>
      )}
      {errorMessage && (
        <Paragraph style={styles.errorMessage}>{errorMessage}</Paragraph>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 5,
    flex: 1,
    minWidth: 150,
  },
  inputStyle: {
    padding: 10,
    backgroundColor: "#787878",
    borderRadius: 20,
    alignItems: "center",
    color: "white",
    width: "100%",
    fontSize: 18,
  },
  errorMessage: {
    color: "red",
  },
  alignVertical: {
    alignItems: "center",
  },
});
