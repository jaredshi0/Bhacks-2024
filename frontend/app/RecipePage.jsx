import { Text, View, StyleSheet, Pressable } from "react-native";
import { router } from 'expo-router';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo } from '@expo/vector-icons'; 
import {
  SourceSerifPro_400Regular,
} from '@expo-google-fonts/source-serif-pro';

export default function RecipePage() {
  let [fontsLoaded] = useFonts({
    SourceSerifPro_400Regular,
    'InstrumentSans': require('../assets/fonts/InstrumentSans.ttf'),
  });

  const params = useLocalSearchParams();
  const { recipe_Name, ingredients, directions } = params;

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={style.pageStyle}>
        {/* Full-Width Gradient Header */}
        <LinearGradient
          colors={["#2E7D32", "#A5D6A7"]}
          style={style.headerContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Left Arrow Icon as Back Button */}
          <Pressable style={style.backButtonContainer} onPress={() => router.back()}>
            <Entypo name="chevron-left" size={24} color="#FFF" />
          </Pressable>

          <Text style={style.recipeNameText}>{recipe_Name}</Text>
        </LinearGradient>

        <View style={style.ingredients}>
          <Text style={style.ingredientsText}>{ingredients}</Text>
        </View>
        <View style={style.directions}>
          <Text style={style.directionText}>{directions}</Text>
        </View>
        <Pressable style={style.buttonStyle} onPress={() => console.log("for backend")}>
          <Text style={style.buttonText}> Save Recipe </Text>
        </Pressable>
      </View>
    );
  }
}

const style = StyleSheet.create({
  pageStyle: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#FFFFFF",
  },
  headerContainer: {
    width: '100%',       
    height: 200,         
    paddingTop: 40,      
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonContainer: {
    position: 'absolute',
    top: 50, // Move down from the top
    left: 10,
  },
  recipeNameText: {
    fontSize: 36,
    color: "#FFF", // White text color for contrast
    fontFamily: 'SourceSerifPro_400Regular',
    textAlign: 'center',
    fontWeight: '400',
    marginTop: 10, // Move text further down if needed
  },
  ingredients: {
    alignSelf: 'flex-start',
    padding: 20,
  },
  ingredientsText: {
    fontSize: 16,
    fontFamily: 'InstrumentSans',
    fontWeight: '600',
  },
  directions: {
    alignSelf: 'flex-start',
    padding: 20,
  },
  directionText: {
    fontSize: 16,
    fontFamily: 'InstrumentSans',
    fontWeight: '600',
  },
  buttonStyle: {
    backgroundColor: '#5db075',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: '700',
  }
});
