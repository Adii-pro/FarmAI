import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StatusBar, ScrollView } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";

import Header from "../components/Header";
import SimpleCameraScanButton from "../components/SimpleCameraScanButton";
import HomeNavigation from "../components/HomeNavigation";
import OnboardingTutorial from "../components/OnboardingTutorial";
import WeatherWidget from "../components/WeatherWidget";
import '../global.css';

import MarketPriceWidget from "../components/MarketPriceWidget";

export default function HomeScreen() {
  const router = useRouter();
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate checking if user is first time user
  useEffect(() => {
    const checkFirstTimeUser = async () => {
      // In a real app, this would check AsyncStorage or similar
      // to determine if the user has completed onboarding
      setTimeout(() => {
        setIsLoading(false);
        // For demo purposes, we'll show onboarding
        // In production, this would be based on stored user preferences
        setShowOnboarding(true);
      }, 1000);
    };

    checkFirstTimeUser();
  }, []);

  // Reset focus when returning to this screen
  useFocusEffect(
    React.useCallback(() => {
      // Could refresh data or update UI when screen is focused
      return () => {
        // Cleanup if needed
      };
    }, []),
  );

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    // In a real app, would save this preference
  };

  const handlePreviousScansPress = () => {
    // Navigate to previous scans screen
    console.log("Navigate to Previous Scans");
    router.push("/previous-scans");
  };

  const handleSettingsPress = () => {
    // Navigate to settings screen
    console.log("Navigate to Settings");
    router.push("/settings");
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-green-50">
        <Text className="text-green-800 text-lg">Loading FarmAI...</Text>
      </View>
    );
  }

  if (showOnboarding) {
    return <OnboardingTutorial onComplete={handleOnboardingComplete} />;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="light-content" backgroundColor="#15803d" />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <ScrollView
        className="flex-1 bg-green-50 px-4 py-4"
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center mb-6">
          <Text className="text-2xl font-bold text-green-800 mb-2">
            Welcome to FarmAI
          </Text>
          <Text className="text-gray-600 text-center">
            Detect crop diseases, identify pests, and get personalized farming
            advice with a simple scan - even offline.
          </Text>
        </View>

        {/* Weather Widget */}
        <WeatherWidget />

        {/* Market Price Widget */}
        <MarketPriceWidget />

        {/* Camera Scan Button */}
        <View className="items-center my-4">
          <SimpleCameraScanButton size={160} />
        </View>

        <View className="w-full">
          <Text className="text-green-700 font-medium mb-2">Quick Tips:</Text>
          <View className="bg-white p-4 rounded-lg shadow-sm">
            <Text className="text-gray-700 mb-2">
              • Frame the crop clearly within the guides
            </Text>
            <Text className="text-gray-700 mb-2">
              • Ensure good lighting for best results
            </Text>
            <Text className="text-gray-700">
              • Works offline for previously scanned crops
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <HomeNavigation
        onPreviousScansPress={handlePreviousScansPress}
        onSettingsPress={handleSettingsPress}
      />
    </SafeAreaView>
  );
}
