import { Stack } from "expo-router";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs(true);

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="RecipePage" options={{ headerShown: false }} />
      <Stack.Screen name="RecipeListPage" options={{ headerShown: false }} />
      <Stack.Screen name="RecipeGeneration" options={{ headerShown: false }} />
    </Stack>
  );
}
