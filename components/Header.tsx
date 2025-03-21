import React from "react";
import { View, Text, StatusBar } from "react-native";
import { Image } from "expo-image";
import { Leaf, Sprout } from "lucide-react-native";

interface HeaderProps {
  title?: string;
  showLogo?: boolean;
}

const Header = ({ title = "FarmAI", showLogo = true }: HeaderProps) => {
  return (
    <View className="bg-green-700 w-full px-4 pt-12 pb-3 flex-row items-center justify-between">
      <StatusBar barStyle="light-content" backgroundColor="#15803d" />
      <View className="flex-row items-center">
        {showLogo && (
          <View className="mr-2 bg-white p-1 rounded-full">
            <Sprout size={24} color="#15803d" />
          </View>
        )}
        <Text className="text-white font-bold text-xl">{title}</Text>
      </View>
      <View>
        <Text className="text-green-200 text-xs">Crop Analysis</Text>
      </View>
    </View>
  );
};

export default Header;