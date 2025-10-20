import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  alignCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  alignLeft: {
    alignItems: "flex-start",
    justifyContent: "center",
  },
  alignCenterSpaceBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  columnJustifyCenter: {
    flexDirection: "column",
    justifyContent: "center",
  },
  spacer20: {
    marginTop: 20,
    marginBottom: 20,
  },
  spacer10: {
    marginTop: 10,
    marginBottom: 10,
  },
  spacer40: {
    marginTop: 40,
    marginBottom: 40,
  },
});
