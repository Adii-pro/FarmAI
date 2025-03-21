import React from "react";
import { ScrollView, TouchableOpacity, Text, View } from "react-native";

interface QuickReplyButtonsProps {
  buttons?: Array<{
    id: string;
    label: string;
    onPress?: () => void;
  }>;
  onButtonPress?: (buttonId: string) => void;
}

const QuickReplyButtons = ({
  buttons = [
    { id: "care", label: "Growing tips" },
    { id: "water", label: "Irrigation" },
    { id: "disease", label: "Pests & diseases" },
    { id: "fertilizer", label: "Fertilizer" },
    { id: "market", label: "Market prices" },
    { id: "weather", label: "Weather impact" },
    { id: "sunlight", label: "Sunlight" },
  ],
  onButtonPress = () => {},
}: QuickReplyButtonsProps) => {
  return (
    <View className="w-full bg-white py-2 border-t border-gray-200">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        className="flex-row gap-2"
      >
        {buttons.map((button) => (
          <TouchableOpacity
            key={button.id}
            onPress={() => {
              if (button.onPress) {
                button.onPress();
              } else {
                onButtonPress(button.id);
              }
            }}
            className="px-4 py-2 rounded-full bg-green-100 border border-green-200"
            activeOpacity={0.7}
          >
            <Text className="text-green-800 font-medium text-sm">
              {button.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default QuickReplyButtons;