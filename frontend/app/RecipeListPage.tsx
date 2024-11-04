import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from 'expo-router';
import BottomNavigation from "../components/BottomNav";

export default function RecipeListPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const recipeList = [
    {
      recipe_Name: "Bacon Egg and Cheese",
      ingredients: "Ingredients: eggs, bacon, cheese",
      directions: ["Step 1", "Step 2"],
      description: "A tasty bacon, egg, and cheese sandwich.",
      prepTime: "10:00",
    },
    {
      recipe_Name: "Avocado Toast",
      ingredients: "Ingredients: avocado, bread, seasoning",
      directions: ["Step 1", "Step 2"],
      description: "Simple and delicious avocado toast.",
      prepTime: "05:00",
    },
    {
      recipe_Name: "Pancakes",
      ingredients: "Ingredients: flour, milk, eggs",
      directions: ["Step 1", "Step 2"],
      description: "Fluffy pancakes with syrup.",
      prepTime: "15:00",
    },
  ];

  // Filter recipes based on search query
  const filteredRecipes = recipeList.filter(recipe =>
    recipe.recipe_Name.toLowerCase().includes(searchQuery.toLowerCase())
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
          <Link
            asChild
            href={{
              pathname: './RecipePage',
              params: {
                recipe_Name: recipe.recipe_Name,
                ingredients: recipe.ingredients,
                directions: recipe.directions,
              },
            }}
            key={index}
          >
            <Pressable style={styles.recipeItem}>
              <Text style={styles.recipeTitle}>{recipe.recipe_Name}</Text>
              <Text style={styles.recipeDescription}>{recipe.description}</Text>
              <Text style={styles.recipePrepTime}>Estimated Preparation Time: {recipe.prepTime}</Text>
            </Pressable>
          </Link>
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
    height: 150,
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
