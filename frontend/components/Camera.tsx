// CameraComponent.tsx
import React from "react";
import { View, Alert, Pressable, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Entypo } from "@expo/vector-icons";

type Props = {
  onCapture: (uri: string) => void;
};

const CameraComponent: React.FC<Props> = ({ onCapture }) => {
  const takePicture = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission Denied", "You've denied camera access.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      onCapture(uri); // Pass URI to parent component
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={takePicture}>
        <Entypo name="camera" size={24} color="black" />
      </Pressable>
    </View>
  );
};

export default CameraComponent;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});
