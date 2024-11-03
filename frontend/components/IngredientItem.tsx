import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from 'axios';

type IngredientItemProps = {
  item: { name: string; quantity: string; expires: string };
  onDelete: (name: string) => void;
  onUpdate: (updatedItem: { name: string; quantity: string; expires: string }) => void;
};


export default function IngredientItem({ item, onDelete, onUpdate }: IngredientItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState(item);
  const handleSave = () => {
    onUpdate(editedItem);
    axios({
      url: "http://10.239.57.74:5000/manual_ingredient",
      method: "post",
      data: {
        "ingredient": editedItem.name,
        "quantity" : editedItem.quantity
      }
    });
    setIsEditing(false);
  };

  return (
    <View style={styles.ingredientItem}>
      <View style={styles.ingredientInfo}>
        {isEditing ? (
          <>
            <TextInput
              style={styles.input}
              value={editedItem.name}
              onChangeText={(text) => setEditedItem({ ...editedItem, name: text })}
            />
            <TextInput
              style={styles.input}
              value={editedItem.quantity}
              onChangeText={(text) => setEditedItem({ ...editedItem, quantity: text })}
            />
            <TextInput
              style={styles.input}
              value={editedItem.expires}
              onChangeText={(text) => setEditedItem({ ...editedItem, expires: text })}
            />
          </>
        ) : (
          <>
            <Text style={styles.ingredientName}>{item.name}</Text>
            <Text style={styles.ingredientExpires}>{item.expires}</Text>
          </>
        )}
      </View>
      {isEditing ? (
        <Pressable onPress={handleSave}>
          <MaterialIcons name="save" size={24} color="black" />
        </Pressable>
      ) : (
        <>
          <Text style={styles.ingredientAmount}>{item.quantity}</Text>
          <Pressable onPress={() => setIsEditing(true)}>
            <MaterialIcons name="edit" size={24} color="black" />
          </Pressable>
        </>
      )}
      <Pressable onPress={() => onDelete(editedItem.name)}>
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
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 5,
    padding: 5,
    fontSize: 16,
  },
});
