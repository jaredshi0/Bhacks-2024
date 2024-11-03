import React from "react";
import { View, StyleSheet , Pressable} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function BottomNavigation() {
  return (
    <View style={styles.bottomNav}>
    <Link href="./" asChild>
      <Pressable>
        <Entypo name="home" size={24} color="#5db075" />
      </Pressable>
    </Link>
    <Link href="./RecipeGeneration" asChild>
      <Pressable>
      <Entypo name="bowl" size={24} color="#3a425a" />
      </Pressable>
    </Link>
      <Pressable><Entypo name="list" size={24} color="#3a405a" /></Pressable>
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
