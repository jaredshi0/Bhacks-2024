import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import IngredientsList from "../components/IngredientsList";
import BottomNavigation from "../components/BottomNav";

export default function Index() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <IngredientsList />
        <BottomNavigation />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});
