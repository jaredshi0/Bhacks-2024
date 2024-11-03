import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useRouter, useSegments } from "expo-router";

export default function BottomNavigation() {
  const router = useRouter();
  const segments = useSegments();

  // Determine the active route
  const activeRoute = segments.length === 0 ? "index" : segments[0]; 

  // Function to navigate to specific routes
  const navigate = (route: "/" | "/RecipeGeneration" | "/RecipeListPage") => {
    router.push(route);
  };

  return (
    <View style={styles.bottomNav}>
      <Pressable onPress={() => navigate("/")}>
        <Entypo name="home" size={35} color={activeRoute === "index" ? "#5db075" : "#3a405a"} />
      </Pressable>
      <Pressable onPress={() => navigate("/RecipeGeneration")}>
        <Entypo name="bowl" size={35} color={activeRoute === "RecipeGeneration" ? "#5db075" : "#3a405a"} />
      </Pressable>
      <Pressable onPress={() => navigate("/RecipeListPage")}>
        <Entypo name="list" size={35} color={activeRoute === "RecipeListPage" ? "#5db075" : "#3a405a"} />
      </Pressable>
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
