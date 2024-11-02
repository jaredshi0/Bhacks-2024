import { Text, View, StyleSheet, ScrollView, Button, Pressable} from "react-native";
import {router} from 'expo-router'
import {useLocalSearchParams} from 'expo-router'
export default function RecipePage()
{
    const params = useLocalSearchParams();
    const {recipe_Name,ingredients, directions} = params;
    return(    
    <View style = {style.pageStyle}>

			<Pressable style ={style.buttonLayout} onPress={() => router.back()}>
			<Text style = {style.backButton}>back</Text>
			</Pressable>
			<View style = {style.recipeName}>
				<Text style = {style.recipeNameText}>{recipe_Name}</Text>
			</View>
			<View style = {style.ingredients}>
				<Text style = {style.ingredientsText}>{ingredients}</Text>
			</View>
			<View style = {style.directions}>
				<Text style = {style.directionText}>{directions}</Text>
			</View>

    </View>
    )
}

const style = StyleSheet.create(
  {
		pageStyle:
		{
			flex:0,
			padding:30,
			alignItems:'center'
		},
		buttonLayout: 
		{
			flex:0,
			alignSelf:'flex-start'
		},
    backButton:
    {
			color:"#5DB075",
			fontSize:14
    },
		recipeName:
		{
			flex:0,
			padding:30.
		},
		recipeNameText:
		{
			fontSize:36,
		},
		ingredients:
		{
			flex: 0,
			alignSelf:'flex-start',
			marginLeft:20,
			padding:10,
		},
		ingredientsText:
		{
				fontSize:16
		},
		directions:
		{
			flex: 0,
			alignSelf:'flex-start',
			padding:10,
			marginLeft:20,

		},
		directionText:
		{
			fontSize:16
		}
  }
)