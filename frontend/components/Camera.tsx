// CameraComponent.tsx
import React, { useState } from "react";
import { View, Image, Alert, Pressable, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Entypo } from "@expo/vector-icons";

// Define the Props type
interface CameraComponentProps {
  onCapture: (uri: string) => void;
}

const CameraComponent: React.FC<CameraComponentProps> = ({ onCapture }) => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

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
      setCapturedImage(uri); // Show the captured image
      onCapture(uri); // Pass the image URI back to parent component
    }
  };

  return (
    <View style={styles.container}>
      {capturedImage && <Image source={{ uri: capturedImage }} style={styles.capturedImage} />}
      <Pressable onPress={takePicture}>
        <Entypo name="camera" size={24} color="black" style={styles.cameraIcon} />
      </Pressable>
    </View>
  );
};

export default CameraComponent;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  capturedImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
  cameraIcon: {
    padding: 10,
  },
});
