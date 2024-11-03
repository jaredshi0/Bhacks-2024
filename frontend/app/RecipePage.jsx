import { Text, View, StyleSheet, ScrollView, Button, Pressable} from "react-native";
import {router} from 'expo-router'
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import {useLocalSearchParams} from 'expo-router'
import {
  SourceSerifPro_400Regular,
} from '@expo-google-fonts/source-serif-pro'


export default function RecipePage()
{
	let [fontsLoaded] = useFonts({
		SourceSerifPro_400Regular,
		'InstrumentSans': require('../assets/fonts/InstrumentSans.ttf'),
	})


    const params = useLocalSearchParams();
    const {recipe_Name,ingredients, directions} = params;
		
		if (!fontsLoaded)
		{
			return <AppLoading/>;
		}else{
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
			<Pressable style={style.buttonStyle} onPress={() => console.log("for backend")}>
            <Text style={style.buttonText}> Save Recipe </Text>
      </Pressable>
    </View>
    )
		}
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
			paddingLeft:20,
			paddingTop:20,
		},
		recipeNameText:
		{
			fontSize:36,
			fontFamily:'SourceSerifPro_400Regular'
		},
		ingredients:
		{
			flex: 0,
			alignSelf:'flex-start',
			marginLeft:5,
			padding:20,
		},
		ingredientsText:
		{
				fontSize:16,
				fontFamily:'InstrumentSans',
				fontWeight:'600',

		},
		directions:
		{
			flex: 0,
			alignSelf:'flex-start',
			padding:20,
			marginLeft:5,

		},
		directionText:
		{
			fontSize:16,
			fontFamily:'InstrumentSans',
			fontWeight:'600',
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
		},
		buttonText:
		{
			fontFamily:'InstrumentSans',
			fontSize:16,
			fontWeight:'700',
		}
  }
)