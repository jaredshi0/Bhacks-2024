import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from 'expo-router';
import axios from 'axios';
import BottomNavigation from "../components/BottomNav";
import { useNavigation , useIsFocused} from "@react-navigation/native";

export default function RecipeListPage() {
  const nav = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const[listOfRecipe, setRecipe] = useState([{'recipe_name': 'hi',ingredients: [{"name": "Cheese", "quantity": "1 cup shredded"}, {"name": "Potato", "quantity": "2 medium, diced"}, {"name": "Egg", "quantity": "6 large"}, {"name": "Ham", "quantity": "4 slices, diced"}]}]);

  // Filter recipes based on search query
  const filteredRecipes = listOfRecipe.filter(recipe =>
    recipe.recipe_name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const isFocused = useIsFocused();
  useEffect(()=>
    {
      axios({
      url: "http://10.239.57.74:5000/get_recipes",
      method:"get",
    }).then(function(response){
      setRecipe(response["data"])
      console.log(response["data"][0]['ingredients'])
    });
  },[isFocused]
)

  return (
    <View style={style.container}>
      {/* Gradient Header */}
      <LinearGradient
        colors={["#2E7D32", "#A5D6A7"]}
        style={style.headerContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={style.headerText}>Your Recipes</Text>
      </LinearGradient>

      {/* Search Bar */}
      <Text style={style.searchLabel}>Search for a Recipe:</Text>
      <TextInput
        style={style.searchBar}
        placeholder="e.g Bacon Egg and Cheese"
        placeholderTextColor="#8A8A8A"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <ScrollView style={{flex:1}}>
        <View style = {style.listStyle}>
        {   
          listOfRecipe.map((item,i)=>
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
            {/* <Text style = {style.firstDirection}>{item.directions}</Text> */}
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
