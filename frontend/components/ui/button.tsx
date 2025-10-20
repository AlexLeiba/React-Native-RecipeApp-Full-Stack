import React from "react";
import {
  StyleSheet,
  TouchableHighlightProps,
  TouchableOpacity,
} from "react-native";
import { H3 } from "../typography/typography";

type ButtonProps = {
  handlePress: () => void;
  title?: string;
  type?: "primary" | "secondary" | "tertiary" | "link" | "ghost";
  children?: React.ReactNode;
} & TouchableHighlightProps;
export const Button = ({
  handlePress,
  title,
  type = "primary",
  children,
  ...rest
}: ButtonProps) => {
  return (
    <TouchableOpacity onPress={handlePress} style={[styled[type]]} {...rest}>
      <>
        {title && (
          <H3
            style={[
              {
                color: styled[type].color,
                fontWeight: "bold",
                textDecorationLine: styled[type].textDecorationLine,
              },
            ]}
          >
            {title}
          </H3>
        )}
        {children}
      </>
    </TouchableOpacity>
  );
};

const styled = StyleSheet.create({
  primary: {
    padding: 10,
    backgroundColor: "#787878",
    borderRadius: 20,
    alignItems: "center",
    color: "white",
    width: "100%",
    textDecorationLine: "none",
  },
  secondary: {
    padding: 10,
    backgroundColor: "#f9bd3d",
    borderRadius: 20,
    alignItems: "center",
    color: "black",
    width: "100%",
    textDecorationLine: "none",
  },
  tertiary: {
    padding: 10,
    backgroundColor: "#8d2111",
    borderRadius: 20,
    alignItems: "center",
    color: "white",
    width: "100%",
    textDecorationLine: "none",
  },
  link: {
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    color: "white",
    textDecorationLine: "underline",
  },
  ghost: {
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    color: "white",
    textDecorationLine: "none",
  },
});
