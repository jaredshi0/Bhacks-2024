import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable, Image } from "react-native";
import IngredientItem from "./IngredientItem";
import { addIngredientToList } from "../constants/ingrUtil";
import { Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import CameraComponent from "./Camera";
import axios from 'axios';

export default function IngredientsList() {
  const [ingredients, setIngredients] = useState([
    { name: "Steak", amount: "1.0 lbs", expires: "Expires 10/2" },
    { name: "Eggs", amount: "12", expires: "Expires 10/2" },
    { name: "Milk", amount: "1 liter", expires: "Expires 10/5" },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const addIngredient = () => {
    const newIngredient = addIngredientToList("New Ingredient", "1 unit", "Expires 10/5");
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  };

  const handleCapture = async (uri: string) => {
    
    setCapturedImage(uri);
// Create a FormData object and append the image file data 

  const formData = new FormData();
  formData.append('image', {
    uri, // URI of the captured image on the local device
  type: 'image/jpeg', // Set the MIME type of the file 
  name: 'captured_image.jpg' }); // Send the form data to the Flask server running on a different device 


  const response = await axios.post('http://10.239.57.74:5000/photo_ingredients', formData, { 
  headers: {
   'Content-Type': 'multipart/form-data'
   } 
  });
  
  };

  const deleteIngredient = (index: number) => {
    setIngredients((prevIngredients) => prevIngredients.filter((_, i) => i !== index));
  };

  const updateIngredient = (index: number, updatedItem: { name: string; amount: string; expires: string }) => {
    const updatedIngredients = ingredients.map((item, i) => (i === index ? updatedItem : item));
    setIngredients(updatedIngredients);
  };

  const filteredIngredients = ingredients.filter((ingredient) =>
    ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for an Ingredient"
        placeholderTextColor="#8A8A8A" // Set a visible placeholder color
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

      {capturedImage && <Image source={{ uri: capturedImage }} style={styles.capturedImage} />}

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
        <CameraComponent onCapture={handleCapture} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchBar: {
    height: 40,
    marginVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#e9e9e9",
    color: "#000",
    fontSize: 16, 
  },
  ingredientsList: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  capturedImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    paddingVertical: 10,
    borderRadius: 10,
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
