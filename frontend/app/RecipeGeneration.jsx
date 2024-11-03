import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable } from "react-native";
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Link } from 'expo-router';
import BottomNavigation from "../components/BottomNav";
import { LinearGradient } from 'expo-linear-gradient';

import {
  SourceSerifPro_400Regular,
} from '@expo-google-fonts/source-serif-pro';

export default function RecipeGeneration() {
  let [fontsLoaded] = useFonts({
    SourceSerifPro_400Regular,
    'InstrumentSans': require('../assets/fonts/InstrumentSans.ttf'),
    'InstrumentSans-italics': require('../assets/fonts/InstrumentSans-Italic.ttf'),
  });

  const [searchQuery, setSearchQuery] = useState("");

  const recipeList = [
    { recipe_Name: 'Bacon Egg and Cheese', ingredients: "Ingredients: eggs, bacon, cheese", directions: ["Step 1", "Step 2"], description: "A tasty bacon, egg, and cheese sandwich.", prepTime: "10:00" },
    { recipe_Name: 'Avocado Toast', ingredients: "Ingredients: avocado, bread, seasoning", directions: ["Step 1", "Step 2"], description: "Simple and delicious avocado toast.", prepTime: "05:00" },
    { recipe_Name: 'Pancakes', ingredients: "Ingredients: flour, milk, eggs", directions: ["Step 1", "Step 2"], description: "Fluffy pancakes with syrup.", prepTime: "15:00" },
  ];

  // Filter recipes based on search query
  const filteredRecipes = recipeList.filter(recipe =>
    recipe.recipe_Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={style.container}>
        {/* Gradient Header */}
        <LinearGradient
          colors={["#2E7D32", "#A5D6A7"]}
          style={style.headerContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={style.headerText}>Recipe Generation</Text>
        </LinearGradient>

        {/* Search Bar */}
        <Text style={style.searchLabel}>Search for a Recipe:</Text>
        <TextInput
          style={style.searchBar}
          placeholder="e.g. Bacon Egg and Cheese"
          placeholderTextColor="#8A8A8A"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* Recipe List */}
        <ScrollView style={style.recipeList}>
          {filteredRecipes.map((item, index) => (
            <Link
              asChild
              href={{
                pathname: './RecipePage',
                params: { recipe_Name: item.recipe_Name, ingredients: item.ingredients, directions: item.directions },
              }}
              key={index}
            >
              <Pressable style={style.recipeItem}>
                <Text style={style.recipeTitle}>{item.recipe_Name}</Text>
                <Text style={style.recipeDescription}>{item.description}</Text>
                <Text style={style.recipePrepTime}>Estimated Preparation Time: {item.prepTime}</Text>
              </Pressable>
            </Link>
          ))}
        </ScrollView>

        <BottomNavigation />
      </View>
    );
  }
}

const style = StyleSheet.create({
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
