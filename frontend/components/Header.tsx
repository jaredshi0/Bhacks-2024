import React from "react";
import { Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Header() {
  return (
    <LinearGradient
      colors={["#2E7D32", "#A5D6A7"]}
      style={styles.header}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Text style={styles.headerText}>Your Ingredients</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFF",
  },
});
