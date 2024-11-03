import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, ActivityIndicator, Pressable } from "react-native";
import { useLocalSearchParams, useRouter, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import {
	SourceSerifPro_400Regular,
  } from '@expo-google-fonts/source-serif-pro'

const API_KEY = "sk-proj-e1NXvcwm153YKdfIrJbcT3BlbkFJA3caADCdzN0qGKXwXvF7"; // Replace with your actual API key

export default function RecipePage() {
  const router = useRouter(); // Initialize router for navigation
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const items = useLocalSearchParams();
  const {recipe_name, ingredients_name, ingredients_quantity, directions} = items;
  let [fontsLoaded] = useFonts({
	SourceSerifPro_400Regular,
	'InstrumentSans': require('../assets/fonts/InstrumentSans.ttf'),
})

  useEffect(() => {
    const generateRecipeImage = async () => {
      try {
        setLoading(true);
        setErrorMessage(null);

        const response = await axios.post(
          'https://api.openai.com/v1/images/generations',
          {
            model: "dall-e-3",
            prompt: `A high-quality food photograph of a well-presented dish of ${recipe_name}. Bright colors, appetizing look, professional lighting.`,
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
  }, [recipe_name]);

  return (
    <View style={styles.container}>
      <LinearGradient asChild
        colors={["#2E7D32", "#A5D6A7"]}
        style={styles.headerContainer}
      >
        <Pressable style={styles.backButtonContainer} onPress={() => router.back()}>
          <Entypo name="chevron-left" size={30} color="#FFF" />
        </Pressable>
        <Text style={styles.recipeNameText}>{recipe_name}</Text>
      </LinearGradient>

      {/* Display Generated Image at the Top */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
      ) : imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.recipeImage} />
      ) : (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}

<View style = {styles.pageStyle}>

<View style = {styles.recipeName}>
	<Text style = {styles.recipeNameText}>{recipe_name}</Text>
</View>

<View style = {styles.ingredients}>
	{
		ingredients_name.map((ingredient,i)=>
		{
			return(
			<Text style = {styles.ingredientsText}>{ingredient}:     {ingredients_quantity[i]}</Text>
			)
		}
	)}
</View>	
<View style = {styles.directions}>
	<Text style = {styles.directionText}>{directions}</Text>
</View>
<Pressable style={styles.buttonStyle} onPress={() => 
	{
	axios({
			url: "http://10.239.57.74:5000/save_recipe",
			method: "post",
			data: {
			  "recipe_name": recipe_name,
			  "ingredients_name" : ingredients_name,
			  "ingredients_quantity" : ingredients_quantity,
			  "directions" : directions
		}
	}),
  router.back()
}
}>
<Text style={styles.buttonText}> Save Recipe </Text>
</Pressable>
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
    height: 200,
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
  buttonStyle:
  {
	  flex:0,
	  backgroundColor: '#5db075',
	  width: '80%',
	  alignItems:'center',
	  justifyContent: 'center',
	  height: 40,
	  borderRadius: 10,
	  alignSelf:'center'
  },
  buttonText:
  {
	  fontFamily:'InstrumentSans',
	  fontSize:16,
	  color: '#FFFFFF',
	  fontWeight:'700',
  }
});
