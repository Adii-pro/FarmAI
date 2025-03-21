import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";
import { FolderOpen, Settings } from "lucide-react-native";

interface HomeNavigationProps {
  onPreviousScansPress?: () => void;
  onSettingsPress?: () => void;
}

const HomeNavigation = ({
  onPreviousScansPress,
  onSettingsPress,
}: HomeNavigationProps) => {
  const router = useRouter();

  const handlePreviousScansPress = () => {
    if (onPreviousScansPress) {
      onPreviousScansPress();
    } else {
      // Default navigation behavior if no custom handler provided
      console.log("Navigate to Previous Scans");
      router.push("/previous-scans");
    }
  };

  const handleSettingsPress = () => {
    if (onSettingsPress) {
      onSettingsPress();
    } else {
      // Default navigation behavior if no custom handler provided
      console.log("Navigate to Settings");
      router.push("/settings");
    }
  };

  return (
    <View className="w-full h-[100px] bg-white flex-row justify-around items-center px-4 border-t border-gray-200">
      <TouchableOpacity
        className="flex-1 items-center justify-center py-3"
        onPress={handlePreviousScansPress}
      >
        <View className="items-center">
          <FolderOpen size={24} color="#4CAF50" />
          <Text className="mt-1 text-sm font-medium text-gray-700">
            Previous Scans
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        className="flex-1 items-center justify-center py-3"
        onPress={handleSettingsPress}
      >
        <View className="items-center">
          <Settings size={24} color="#4CAF50" />
          <Text className="mt-1 text-sm font-medium text-gray-700">
            Settings
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HomeNavigation;