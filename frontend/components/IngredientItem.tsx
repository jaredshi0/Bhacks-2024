import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type IngredientItemProps = {
  item: { name: string; amount: string; expires: string };
  onDelete: () => void;
};

export default function IngredientItem({ item, onDelete }: IngredientItemProps) {
  return (
    <View style={styles.ingredientItem}>
      <View style={styles.ingredientInfo}>
        <Text style={styles.ingredientName}>{item.name}</Text>
        <Text style={styles.ingredientExpires}>{item.expires}</Text>
      </View>
      <Text style={styles.ingredientAmount}>{item.amount}</Text>
      <Pressable onPress={onDelete}>
        <MaterialIcons name="delete" size={24} color="black" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e9e9e9",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  ingredientInfo: {
    flex: 2,
  },
  ingredientName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  ingredientExpires: {
    fontSize: 14,
    color: "#666",
  },
  ingredientAmount: {
    fontSize: 16,
    marginHorizontal: 10,
  },
});
