import React from "react";
import { View, Text, ScrollView, Image } from "react-native";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
  imageUrl?: string;
}

interface ChatMessagesProps {
  messages?: Message[];
  isLoading?: boolean;
}

const ChatMessages = ({
  messages = [
    {
      id: "1",
      text: "Hello! How can I help with your plant today?",
      sender: "ai",
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: "2",
      text: "My tomato plant leaves are turning yellow. What could be wrong?",
      sender: "user",
      timestamp: new Date(Date.now() - 1800000),
      imageUrl:
        "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400&q=80",
    },
    {
      id: "3",
      text: "Yellow leaves on tomato plants are often caused by nutrient deficiencies, particularly nitrogen. It could also be due to overwatering or a fungal disease. Can you tell me more about your watering schedule?",
      sender: "ai",
      timestamp: new Date(Date.now() - 1200000),
    },
  ],
  isLoading = false,
}: ChatMessagesProps) => {
  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1 p-4"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            className={`mb-4 max-w-[80%] ${message.sender === "user" ? "self-end ml-auto" : "self-start"}`}
          >
            <View
              className={`p-3 rounded-2xl ${message.sender === "user" ? "bg-blue-500" : "bg-gray-100"}`}
            >
              <Text
                className={`${message.sender === "user" ? "text-white" : "text-gray-800"}`}
              >
                {message.text}
              </Text>
              {message.imageUrl && (
                <View className="mt-2 rounded-lg overflow-hidden">
                  <Image
                    source={{ uri: message.imageUrl }}
                    className="w-full h-40"
                    resizeMode="cover"
                  />
                </View>
              )}
            </View>
            <Text className="text-xs text-gray-500 mt-1">
              {message.timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </View>
        ))}

        {isLoading && (
          <View className="self-start bg-gray-100 p-3 rounded-2xl mb-4">
            <View className="flex-row">
              <Text className="text-gray-500">•</Text>
              <Text className="text-gray-500 mx-1">•</Text>
              <Text className="text-gray-500">•</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ChatMessages;