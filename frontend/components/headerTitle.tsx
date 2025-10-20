import React from "react";
import { StyleSheet, View } from "react-native";
import { H1 } from "./typography/typography";

function HeaderTitle({ title }: { title: string }) {
  return (
    <View style={styles.container}>
      <H1>{title}</H1>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 60,
  },
});

export default HeaderTitle;
