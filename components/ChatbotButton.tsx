import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { MessageCircle } from "lucide-react-native";
import * as Haptics from "expo-haptics";

interface ChatbotButtonProps {
  onPress?: () => void;
  isActive?: boolean;
  size?: number;
  color?: string;
  backgroundColor?: string;
}

const ChatbotButton = ({
  onPress,
  isActive = false,
  size = 60,
  color = "white",
  backgroundColor = "#22c55e",
}: ChatbotButtonProps) => {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPress();
  };

  return (
    <View className="items-center">
      <TouchableOpacity
        onPress={handlePress}
        className={`rounded-full shadow-lg items-center justify-center ${isActive ? "bg-blue-500" : ""}`}
        style={{
          width: size,
          height: size,
          backgroundColor: isActive ? "#3b82f6" : backgroundColor,
          elevation: 5,
        }}
        activeOpacity={0.7}
      >
        <MessageCircle size={size * 0.5} color={color} />
        {isActive && (
          <View className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white" />
        )}
      </TouchableOpacity>
      {isActive && (
        <Text className="text-xs text-gray-600 mt-1 font-medium">
          New messages
        </Text>
      )}
    </View>
  );
};

export default ChatbotButton;