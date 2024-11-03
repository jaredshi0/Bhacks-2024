import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable } from "react-native";
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Link } from 'expo-router';
import BottomNavigation from "../components/BottomNav";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import {
  SourceSerifPro_400Regular,
} from '@expo-google-fonts/source-serif-pro'
import axios from "axios";

export default function RecipeGeneration() {
  const nav = useNavigation();

  	let [fontsLoaded] = useFonts({
		SourceSerifPro_400Regular,
    'InstrumentSans': require('../assets/fonts/InstrumentSans.ttf'),
    'InstrumentSans-italics': require('../assets/fonts/InstrumentSans-Italic.ttf'),
  });

  const [searchQuery, setSearchQuery] = useState("");
  const[listOfRecipe, setRecipe] = useState([]);

  // Filter recipes based on search query
  const filteredRecipes = listOfRecipe.filter(recipe =>
    recipe.recipe_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

    return( 
        <View style={style.pageTemp}>
        {/* Gradient Header */}
        <LinearGradient asChild
          colors={["#2E7D32", "#A5D6A7"]}
          style={style.headerContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={style.headerText}>Recipe Generation</Text>
        </LinearGradient>
  
          <Pressable style={style.buttonStyle} onPress={() => {
            axios(
              {
                url: "http://10.239.57.74:5000/generate_recipe",
                method:"get",
              }).then(function(response){
                setRecipe(response["data"]),
                console.log("hi")
              }
            )
          }}>
            <Text style={style.buttonText}> Click to Generate! </Text>
          </Pressable>
        <ScrollView style={{flex:1}}>
        <View style = {style.listStyle}>
        {
          
          filteredRecipes.map((item,i)=>
          {
            //finish onClick
          return<Pressable style = {style.recipeList} key={i} onPress={()=>nav.navigate('RecipePage',{ 
            recipe_name:item.recipe_name,
            ingredients_name:item.ingredients.map(ingredient=>ingredient.name),
            ingredients_quantity:item.ingredients.map(ingredient=>ingredient.quantity),
            directions:item.directions
            })}> 
            <Text style = {style.recipeTitle}>{item.recipe_name} </Text>
            <Text style = {style.recipeIngredients}>ingredients</Text> 
            {
              item.ingredients.map((items,i)=>
              {
                return(
                <Text style = {style.recipeIngredients}>{items.name} {items.quantity}</Text> 
                )     
              })
            }
            <Text style = {style.firstDirection}>{item.directions[0]}</Text>
            </Pressable>
          })
          }
        </View>
        </ScrollView>

        <BottomNavigation />
      </View>
    );
}


const style = StyleSheet.create({


  pageTemp: 
  {
    backgroundColor: "#FFFFFF",
    flex:1
  },
  topHeader:
  {
    flex:.38,
    height: 200,
    backgroundColor: '#5db075',
    alignItems : 'center',
    justifyContent: 'center',
  },
  buttonStyle:
  {
    flex : 1,
    width: '80%',
    height: '5%',
    backgroundColor: '#3a405a',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    position: 'absolute',
    top: '17%'
    
  },
  titleStyle:
  {
    fontSize: 36,
    fontWeight: '400',
    fontFamily: 'SourceSerifPro_400Regular'
  },

  buttonText:
  {
    flex : 0,
    color: '#FFFFFF',
    fontFamily: 'InstrumentSans-Italics'
  },

  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerContainer: {
    width: "100%",
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    marginBottom:50
  },
  headerText: {
    fontSize: 32,
    color: "#FFF",
    fontWeight: "bold",
  },
  recipeList: {
    flex: 1,
    marginHorizontal: 20,
  },
  recipeItem: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 15,
    marginBottom: 30,
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
  listStyle:
  {
    flex: 3,
    alignItems: 'center'
  },
  recipeList:
  {
    flex: 0,
    backgroundColor : '#e9e9e9',
    width : "80%",
    marginBottom: 20,
    paddingLeft:10,
    borderRadius: 10,
  },
  recipeTitle:
  {
    fontSize: 20,
    margin: 3,
    fontWeight:'600',
    fontFamily: 'InstrumentSans'
  },
  recipeIngredients:
  {
    fontSize: 15,
    margin: 1,
    fontWeight:'600',
    fontFamily: 'InstrumentSans'

  },
  firstDirection:
  {
    fontSize: 15,
    margin: 3,
    fontWeight:'600',
    fontFamily: 'InstrumentSans'
  }
});
