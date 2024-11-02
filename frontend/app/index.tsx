// /frontend/app/index.tsx

import React from "react";
import { View, StyleSheet } from "react-native";
import IngredientsList from "../components/IngredientsList";
import BottomNavigation from "../components/BottomNav";
import Header from "../components/Header"; // Import Header component

export default function Index() {
  return (
    <View style={styles.container}>
      <Header /> 
      <IngredientsList />
      <BottomNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});
