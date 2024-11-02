import React from "react";
import { View, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function BottomNavigation() {
  return (
    <View style={styles.bottomNav}>
      <Entypo name="home" size={24} color="#5db075" />
      <Entypo name="bowl" size={24} color="#3a405a" />
      <Entypo name="list" size={24} color="#3a405a" />
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    backgroundColor: "#F5F5F5",
  },
});
