import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable } from "react-native";
import IngredientItem from "./IngredientItem";
import { addIngredientToList } from "../constants/ingrUtil";
import { Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient

export default function IngredientsList() {
  const [ingredients, setIngredients] = useState([
    { name: "Steak", amount: "1.0 lbs", expires: "Expires 10/2" },
    { name: "Eggs", amount: "12", expires: "Expires 10/2" },
    { name: "Milk", amount: "1 liter", expires: "Expires 10/5" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const addIngredient = () => {
    const newIngredient = addIngredientToList("New Ingredient", "1 unit", "Expires 10/5");
    setIngredients([...ingredients, newIngredient]);
  };

  const deleteIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const updateIngredient = (index: number, updatedItem: { name: string; amount: string; expires: string }) => {
    const updatedIngredients = ingredients.map((item, i) => (i === index ? updatedItem : item));
    setIngredients(updatedIngredients);
  };

  const filteredIngredients = ingredients.filter((ingredient) =>
    ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for an Ingredient"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <ScrollView style={styles.ingredientsList}>
        {filteredIngredients.map((item, index) => (
          <IngredientItem
            key={index}
            item={item}
            onDelete={() => deleteIngredient(index)}
            onUpdate={(updatedItem) => updateIngredient(index, updatedItem)}
          />
        ))}
      </ScrollView>

      <View style={styles.bottomButtons}>
        <LinearGradient
          colors={["#2E7D32", "#A5D6A7"]}
          style={styles.gradientButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Pressable style={styles.pressable} onPress={addIngredient}>
            <Text style={styles.addButtonText}>Click to add an Ingredient</Text>
          </Pressable>
        </LinearGradient>
        <Entypo name="camera" size={24} color="black" style={styles.cameraIcon} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  gradientButton: {
    flex: 1,
    borderRadius: 10,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  pressable: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 10,
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
