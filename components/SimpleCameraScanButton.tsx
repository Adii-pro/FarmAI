import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Camera } from "lucide-react-native";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";

interface SimpleCameraScanButtonProps {
  size?: number;
  color?: string;
  label?: string;
}

const SimpleCameraScanButton = ({
  size = 200,
  color = "#10b981",
  label = "Scan Crop",
}: SimpleCameraScanButtonProps) => {
  const handlePress = () => {
    // Provide haptic feedback when button is pressed
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // Navigate to camera screen with error handling
    try {
      router.push("/camera");
    } catch (error) {
      console.error("Navigation error:", error);
      // Try alternative approach if first attempt fails
      setTimeout(() => {
        try {
          router.push("/camera");
        } catch (retryError) {
          console.error("Retry navigation failed:", retryError);
        }
      }, 100);
    }
  };

  return (
    <View className="items-center justify-center bg-white">
      <TouchableOpacity
        onPress={handlePress}
        className="items-center justify-center rounded-full shadow-lg"
        style={{
          width: size,
          height: size,
          backgroundColor: color,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 6,
          elevation: 8,
        }}
      >
        <Camera size={size * 0.4} color="white" strokeWidth={1.5} />
      </TouchableOpacity>
      <Text className="mt-4 text-lg font-medium text-gray-800">{label}</Text>
    </View>
  );
};

export default SimpleCameraScanButton;