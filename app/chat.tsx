import React from "react";
import { SafeAreaView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import AIChatbot from "../components/AIChatbot";

export default function ChatScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const plantName = (params.name as string) || "Tomato Plant";

  const handleBack = () => {
    router.back();
  };

  const handleClose = () => {
    router.push("index");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AIChatbot
        onBack={handleBack}
        onClose={handleClose}
        plantName={plantName}
      />
    </SafeAreaView>
  );
}
