import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Camera } from "lucide-react-native";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";

interface ScanButtonProps {
  onPress?: () => void;
  isScanning?: boolean;
  size?: number;
  color?: string;
}

const ScanButton = ({
  onPress,
  isScanning = false,
  size = 80,
  color = "#ffffff",
}: ScanButtonProps) => {
  const router = useRouter();

  const handlePress = () => {
    // Provide haptic feedback when button is pressed
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    if (onPress) {
      onPress();
    } else {
      // Default behavior if no onPress handler is provided
      console.log("Scan button pressed");
      router.push("/camera");
    }
  };

  return (
    <View className="items-center justify-center">
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        className={`rounded-full items-center justify-center ${isScanning ? "bg-red-500" : "bg-green-500"}`}
        style={{
          width: size,
          height: size,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        {isScanning ? (
          <View className="h-10 w-10 rounded-sm bg-white" />
        ) : (
          <Camera size={size * 0.5} color={color} />
        )}
      </TouchableOpacity>
      <Text className="mt-2 text-sm font-medium text-gray-700">
        {isScanning ? "Stop Scan" : "Scan Crop"}
      </Text>
    </View>
  );
};

export default ScanButton;
