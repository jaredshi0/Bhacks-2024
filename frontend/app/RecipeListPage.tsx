import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import BottomNavigation from "@/components/BottomNav";

export default function RecipeListPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const recipeList = [
    {
      title: "Bacon Egg and Cheese",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque placerat condimentum. Pellentesque vitae libero id nibh sollicitudin suscipit ac sit amet sem. Mauris mattis feugiat congue. Sed tristique erat ante, sed consequat dui ultrices id.",
      prepTime: "XX:XX",
    },
    {
      title: "Avocado Toast",
      description: "A simple and delicious avocado toast recipe with a hint of lime and a sprinkle of chili flakes.",
      prepTime: "05:00",
    },
    {
      title: "Pancakes",
      description: "Fluffy pancakes with a hint of vanilla and a drizzle of maple syrup.",
      prepTime: "15:00",
    },
  ];

  // Filter recipes based on search query
  const filteredRecipes = recipeList.filter(recipe =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Gradient Header */}
      <LinearGradient
        colors={["#2E7D32", "#A5D6A7"]}
        style={styles.headerContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.headerText}>Your Recipes</Text>
      </LinearGradient>

      {/* Search Bar */}
      <Text style={styles.searchLabel}>Search for a Recipe:</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="e.g Bacon Egg and Cheese"
        placeholderTextColor="#8A8A8A"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Recipe List */}
      <ScrollView style={styles.recipeList}>
        {filteredRecipes.map((recipe, index) => (
          <View key={index} style={styles.recipeItem}>
            <Text style={styles.recipeTitle}>{recipe.title}</Text>
            <Text style={styles.recipeDescription}>{recipe.description}</Text>
            <Text style={styles.recipePrepTime}>Estimated Preparation Time: {recipe.prepTime}</Text>
          </View>
        ))}
      </ScrollView>
      <BottomNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerContainer: {
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 32,
    color: "#FFF",
    fontWeight: "bold",
  },
  searchLabel: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  searchBar: {
    height: 40,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#e9e9e9",
    color: "#000",
  },
  recipeList: {
    flex: 1,
    marginHorizontal: 20,
  },
  recipeItem: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  recipeTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  recipeDescription: {
    fontSize: 14,
    marginBottom: 10,
  },
  recipePrepTime: {
    fontSize: 14,
    fontWeight: "600",
  },
});
