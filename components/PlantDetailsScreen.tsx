import React, { useState } from "react";
import { View, SafeAreaView, StatusBar } from "react-native";
import PlantHeader from "./PlantHeader";
import PlantInfoTabs from "./PlantInfoTabs";
import PlantInfoContent from "./PlantInfoContent";
import ChatbotButton from "./ChatbotButton";

interface PlantDetailsScreenProps {
  plantId?: string;
  plantName?: string;
  scientificName?: string;
  healthStatus?: "healthy" | "moderate" | "poor";
  plantImage?: string;
  onBackPress?: () => void;
  onInfoPress?: () => void;
  onChatPress?: () => void;
}

const PlantDetailsScreen = ({
  plantId = "123",
  plantName = "Tomato Plant",
  scientificName = "Solanum lycopersicum",
  healthStatus = "healthy",
  plantImage = "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=800&q=80",
  onBackPress = () => {},
  onInfoPress = () => {},
  onChatPress = () => {},
}: PlantDetailsScreenProps) => {
  const [activeTab, setActiveTab] = useState("growing-conditions");

  // Map tab IDs to content types for PlantInfoContent
  const tabToContentMap: Record<string, string> = {
    "growing-conditions": "growing",
    "common-issues": "issues",
    "care-tips": "growing",
    "harvest-info": "growing",
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="light-content" />
      <View className="flex-1">
        {/* Plant Header with image and basic info */}
        <PlantHeader
          plantName={plantName}
          scientificName={scientificName}
          healthStatus={healthStatus}
          plantImage={plantImage}
          onBackPress={onBackPress}
          onInfoPress={onInfoPress}
        />

        {/* Tab Navigation */}
        <PlantInfoTabs activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Content Area */}
        <View className="flex-1">
          <PlantInfoContent
            activeTab={tabToContentMap[activeTab] || "growing"}
          />
        </View>

        {/* Floating Chatbot Button */}
        <View className="absolute bottom-6 right-6">
          <ChatbotButton
            onPress={onChatPress}
            isActive={false}
            plantName={plantName}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PlantDetailsScreen;