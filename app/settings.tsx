import React from "react";
import { SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import SettingsMenu from "../components/SettingsMenu";

export default function SettingsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <SettingsMenu />
    </SafeAreaView>
  );
}
