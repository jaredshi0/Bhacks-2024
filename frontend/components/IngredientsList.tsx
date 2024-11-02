import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable } from "react-native";
import IngredientItem from "./IngredientItem";
import { addIngredientToList } from "../constants/ingrUtil";
import { Entypo } from "@expo/vector-icons";

export default function IngredientsList() {
  const [ingredients, setIngredients] = useState([
    { name: "Steak", amount: "1.0 lbs", expires: "Expires 10/2" },
    { name: "Eggs", amount: "12", expires: "Expires 10/2" },
  ]);

  const addIngredient = () => {
    const newIngredient = addIngredientToList("New Ingredient", "1 unit", "Expires 10/5");
    setIngredients([...ingredients, newIngredient]);
  };

  const deleteIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Ingredients</Text>
      </View>
      <TextInput style={styles.searchBar} placeholder="e.g. Eggs, Milk, Chicken" />

      {/* Adding ingredientsList style to ScrollView */}
      <ScrollView style={styles.ingredientsList}>
        {ingredients.map((item, index) => (
          <IngredientItem
            key={index}
            item={item}
            onDelete={() => deleteIngredient(index)}
          />
        ))}
      </ScrollView>

      <View style={styles.bottomButtons}>
        <Pressable style={styles.addButton} onPress={addIngredient}>
          <Text style={styles.addButtonText}>Click to add an Ingredient</Text>
        </Pressable>
        <Entypo name="camera" size={24} color="black" style={styles.cameraIcon} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 100,
    backgroundColor: "#5db075",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
  },
  searchBar: {
    height: 40,
    margin: 12,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#e9e9e9",
    color: "#000",
  },
  ingredientsList: {
    flex: 1,
    marginHorizontal: 20,
  },
  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  addButton: {
    flex: 1,
    backgroundColor: "#5db075",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 10,
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  cameraIcon: {
    padding: 10,
  },
});
