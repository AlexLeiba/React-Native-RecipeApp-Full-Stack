import { StyleProp, StyleSheet, TextProps, TextStyle } from "react-native";
import { ThemedText } from "../themed-text";

export const H1 = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}) => {
  return <ThemedText style={[styles.h1, style]}>{children}</ThemedText>;
};
export const H2 = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}) => {
  return <ThemedText style={[styles.h2, style]}>{[children]}</ThemedText>;
};
export const H3 = ({
  children,
  style,
  ...rest
}: {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
} & TextProps) => {
  return (
    <ThemedText style={[styles.h3, style]} {...rest}>
      {children}
    </ThemedText>
  );
};
export const Paragraph = ({
  children,
  style,
  ...rest
}: {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
} & TextProps) => {
  return (
    <ThemedText style={[styles.paragraph, style]} {...rest}>
      {children}
    </ThemedText>
  );
};
export const ParagraphSmall = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}) => {
  return (
    <ThemedText style={[styles.paragraphSmall, style]}>{children}</ThemedText>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 32,
  },
  h2: {
    fontSize: 24,
  },
  h3: {
    fontSize: 20,
  },
  paragraph: {
    fontSize: 16,
  },
  paragraphSmall: {
    fontSize: 12,
  },
});
