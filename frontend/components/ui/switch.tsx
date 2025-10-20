import React from "react";
import { StyleSheet, Switch } from "react-native";
import { ThemedView } from "../themed-view";
import { H3 } from "../typography/typography";

type Props = {
  value: boolean;
  label?: string;
  handleChange: (value: boolean) => void;
};

function SwitchComponent({ value, handleChange, label }: Props) {
  return (
    <ThemedView style={styles.container}>
      {label && <H3>{label}</H3>}
      <Switch value={value} onValueChange={handleChange} />
    </ThemedView>
  );
}

export default SwitchComponent;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 15,
    flex: 1,
    minWidth: 200,
    alignItems: "center",
  },
});
