import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, ActivityIndicator, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';

const API_KEY = "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"; // Replace with your actual API key

export default function RecipePage() {
  const router = useRouter(); // Initialize router for navigation
  const { recipe_Name, ingredients, directions } = useLocalSearchParams();
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const generateRecipeImage = async () => {
      try {
        setLoading(true);
        setErrorMessage(null);

        const response = await axios.post(
          'https://api.openai.com/v1/images/generations',
          {
            model: "dall-e-3",
            prompt: `A high-quality food photograph of a well-presented dish of ${recipe_Name}. Bright colors, appetizing look, professional lighting.`,
            n: 1,
            size: "1024x1024",
          },
          {
            headers: {
              'Authorization': `Bearer ${API_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.data && response.data.data && response.data.data.length > 0) {
          const image_url = response.data.data[0].url;
          setImageUrl(image_url);
        } else {
          console.error("Unexpected response format:", response.data);
          setErrorMessage("Failed to generate image. Unexpected response format.");
        }
      } catch (error) {
        console.error("Error generating image:", error.response ? error.response.data : error.message);
        setErrorMessage("Failed to generate image. Please check your connection or try again later.");
      } finally {
        setLoading(false);
      }
    };

    generateRecipeImage();
  }, [recipe_Name]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#2E7D32", "#A5D6A7"]}
        style={styles.headerContainer}
      >
        <Pressable style={styles.backButtonContainer} onPress={() => router.back()}>
          <Entypo name="chevron-left" size={24} color="#FFF" />
        </Pressable>
        <Text style={styles.recipeNameText}>{recipe_Name}</Text>
      </LinearGradient>

      {/* Display Generated Image at the Top */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
      ) : imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.recipeImage} />
      ) : (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}

      {/* Display Ingredients */}
      <View style={styles.ingredients}>
        <Text style={styles.sectionTitle}>Ingredients</Text>
        <Text style={styles.ingredientsText}>{ingredients}</Text>
      </View>

      {/* Display Directions */}
      <View style={styles.directions}>
        <Text style={styles.sectionTitle}>Directions</Text>
        <Text style={styles.directionText}>{directions}</Text>
      </View>
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
  backButtonContainer: {
    position: 'absolute',
    top: 50,
    left: 10,
  },
  recipeNameText: {
    fontSize: 36,
    color: "#FFF",
    fontWeight: "bold",
  },
  loadingIndicator: {
    marginTop: 20,
    alignSelf: "center",
  },
  recipeImage: {
    width: "100%",
    height: 300,
    alignSelf: "center",
    marginVertical: 10,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  ingredients: {
    paddingHorizontal: 20,
  },
  ingredientsText: {
    fontSize: 16,
    fontWeight: "600",
    paddingVertical: 10,
  },
  directions: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  directionText: {
    fontSize: 16,
    fontWeight: "600",
    paddingVertical: 10,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
});
