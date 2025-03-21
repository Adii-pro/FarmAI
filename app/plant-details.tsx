import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import PlantDetailsScreen from "../components/PlantDetailsScreen";

export default function PlantDetailsPage() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const imageUri = params.imageUri as string;

  const handleBackPress = () => {
    router.back();
  };

  const handleChatPress = () => {
    router.push({
      pathname: "/chat",
      params: { name: "Tomato Plant" },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <PlantDetailsScreen
        onBackPress={handleBackPress}
        onChatPress={handleChatPress}
        plantName="Tomato Plant"
        healthStatus="healthy"
        scientificName="Solanum lycopersicum"
        plantImage={
          imageUri ||
          "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=800&q=80"
        }
      />
    </SafeAreaView>
  );
}