import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { ArrowLeft, X } from "lucide-react-native";
import ChatMessages from "./ChatMessages";
import QuickReplyButtons from "./QuickReplyButtons";
import ChatInput from "./ChatInput";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
  imageUrl?: string;
}

interface AIChatbotProps {
  onClose?: () => void;
  onBack?: () => void;
  initialMessages?: Message[];
  isLoading?: boolean;
  plantName?: string;
}

const AIChatbot = ({
  onClose = () => {},
  onBack = () => {},
  initialMessages = [
    {
      id: "1",
      text: "Hello! How can I help with your plant today?",
      sender: "ai",
      timestamp: new Date(Date.now() - 3600000),
    },
  ],
  isLoading = false,
  plantName = "Tomato Plant",
}: AIChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [loading, setLoading] = useState<boolean>(isLoading);

  const handleSendMessage = (text: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(text, plantName),
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setLoading(false);
    }, 1500);
  };

  const getAIResponse = (userMessage: string, plantName: string): string => {
    const lowerCaseMessage = userMessage.toLowerCase();

    if (lowerCaseMessage.includes("water")) {
      return `For your ${plantName} crop, maintain consistent soil moisture. During the vegetative stage, water when the top 2-3 cm of soil feels dry. Reduce watering during ripening to improve flavor and reduce disease risk.`;
    } else if (lowerCaseMessage.includes("fertiliz")) {
      return `For ${plantName}, apply nitrogen-rich fertilizer during early growth stages. Switch to phosphorus and potassium-rich fertilizer during flowering and fruiting. Consider organic options like compost tea or manure for sustainable farming.`;
    } else if (
      lowerCaseMessage.includes("disease") ||
      lowerCaseMessage.includes("pest")
    ) {
      return `Based on your ${plantName} image, I've detected early signs of Early Blight. Remove infected leaves immediately and improve air circulation between plants. Apply copper-based fungicide every 7-10 days. For prevention, practice crop rotation and avoid overhead irrigation.`;
    } else if (
      lowerCaseMessage.includes("sun") ||
      lowerCaseMessage.includes("light")
    ) {
      return `${plantName} requires full sun exposure (6-8 hours daily) for optimal yield. In your region's climate, consider providing afternoon shade during the hottest months to prevent sun scald on fruits.`;
    } else if (
      lowerCaseMessage.includes("care") ||
      lowerCaseMessage.includes("tip")
    ) {
      return `For maximizing your ${plantName} yield: 1) Plant in well-draining soil with pH 6.0-6.8, 2) Space plants properly for air circulation, 3) Implement drip irrigation to reduce leaf wetness, 4) Apply mulch to conserve moisture and suppress weeds, 5) Consider companion planting with marigolds to deter pests.`;
    } else if (
      lowerCaseMessage.includes("market") ||
      lowerCaseMessage.includes("price") ||
      lowerCaseMessage.includes("sell")
    ) {
      return `Current market prices for ${plantName} in your region range from $0.75-$1.25/kg depending on quality. Consider direct marketing to local restaurants for premium prices. Organic certified crops can command 20-30% higher prices.`;
    } else if (
      lowerCaseMessage.includes("weather") ||
      lowerCaseMessage.includes("rain") ||
      lowerCaseMessage.includes("forecast")
    ) {
      return `Based on weather forecasts for your region, expect moderate rainfall (15-20mm) over the next 5 days. Consider delaying any pesticide application until after this rain period. The upcoming humidity may increase disease pressure, so monitor your ${plantName} closely.`;
    } else {
      return `Thank you for your question about your ${plantName} crop. To provide more specific advice for your farm, could you share more details about your soil type, irrigation method, or the specific symptoms you're observing?`;
    }
  };

  const handleQuickReply = (buttonId: string) => {
    let replyText = "";

    switch (buttonId) {
      case "care":
        replyText = `What are the best practices for growing ${plantName}?`;
        break;
      case "water":
        replyText = `What's the optimal irrigation schedule for ${plantName} in my region?`;
        break;
      case "disease":
        replyText = `What diseases and pests commonly affect ${plantName} crops?`;
        break;
      case "fertilizer":
        replyText = `What fertilizer schedule is recommended for ${plantName}?`;
        break;
      case "sunlight":
        replyText = `How much sunlight does ${plantName} need for optimal yield?`;
        break;
      case "market":
        replyText = `What are current market prices for ${plantName}?`;
        break;
      case "weather":
        replyText = `How will upcoming weather affect my ${plantName} crop?`;
        break;
      default:
        replyText = `Tell me more about growing ${plantName} commercially.`;
    }

    handleSendMessage(replyText);
  };

  const handleUploadPhoto = () => {
    // Simulate photo upload
    const userMessage: Message = {
      id: Date.now().toString(),
      text: "I've uploaded another photo of my plant.",
      sender: "user",
      timestamp: new Date(),
      imageUrl:
        "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=400&q=80",
    };

    setMessages((prev) => [...prev, userMessage]);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
        <TouchableOpacity onPress={onBack} className="p-2">
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>

        <Text className="text-lg font-bold text-gray-800">Farm Assistant</Text>

        <TouchableOpacity onPress={onClose} className="p-2">
          <X size={24} color="#374151" />
        </TouchableOpacity>
      </View>

      {/* Chat area */}
      <View className="flex-1">
        <ChatMessages messages={messages} isLoading={loading} />
      </View>

      {/* Quick reply buttons */}
      <QuickReplyButtons onButtonPress={handleQuickReply} />

      {/* Input area */}
      <ChatInput
        onSendMessage={handleSendMessage}
        onUploadPhoto={handleUploadPhoto}
        disabled={loading}
      />
    </SafeAreaView>
  );
};

export default AIChatbot;