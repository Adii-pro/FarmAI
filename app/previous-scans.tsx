import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { useRouter } from "expo-router";
import PreviousScansGallery from "../components/PreviousScansGallery";

export default function PreviousScansScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" backgroundColor="#F3F4F6" />
      <PreviousScansGallery />
    </SafeAreaView>
  );
}
