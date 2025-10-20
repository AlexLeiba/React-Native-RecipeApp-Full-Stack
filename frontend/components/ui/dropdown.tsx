import { Picker } from "@react-native-picker/picker";
import React from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { ThemedView } from "../themed-view";
import { H3 } from "../typography/typography";

type OptionsType = {
  id: number;
  name: string;
};

type Props = {
  value: string;
  label?: string;
  options: OptionsType[];
  handleChange: (categoryValue: string) => void;
};
export function DropDown({ value, label, options, handleChange }: Props) {
  const theme = useColorScheme() ?? "light";
  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        {label && <H3>{label}</H3>}
        <Picker
          // @ts-ignore
          selectedValue={value}
          onValueChange={(categoryValue) => handleChange(categoryValue)}
          style={[
            {
              color: theme === "light" ? "black" : "white",
              backgroundColor: theme === "light" ? "white" : "black",
            },
            styles.picker,
          ]}
        >
          {options.map((category) => (
            <Picker.Item
              key={category.id}
              label={category.name}
              value={category.name.toLowerCase()}
            />
          ))}
        </Picker>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 5,
    minWidth: 200,
    flex: 1,
  },
  picker: {
    padding: 10,
    borderRadius: 20,
  },
});
