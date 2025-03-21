import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  ArrowLeft,
  Globe,
  WifiOff,
  Bell,
  Trash,
  HardDrive,
  ChevronRight,
  Moon,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

interface SettingsMenuProps {
  onClose?: () => void;
}

const SettingsMenu = ({ onClose }: SettingsMenuProps) => {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("English");
  const [offlineEnabled, setOfflineEnabled] = useState(true);

  const handleBack = () => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  const handleClearCache = () => {
    Alert.alert(
      "Clear Cache",
      "Are you sure you want to clear all cached plant data? This will remove all offline data.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: () => console.log("Cache cleared"),
        },
      ],
    );
  };

  const handleLanguageSelect = () => {
    // This would open a language selection modal in a real implementation
    Alert.alert("Select Language", "Choose your preferred language", [
      { text: "English", onPress: () => setLanguage("English") },
      { text: "Spanish", onPress: () => setLanguage("Spanish") },
      { text: "French", onPress: () => setLanguage("French") },
      { text: "Swahili", onPress: () => setLanguage("Swahili") },
      { text: "Hindi", onPress: () => setLanguage("Hindi") },
      { text: "Portuguese", onPress: () => setLanguage("Portuguese") },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <StatusBar style={darkMode ? "light" : "dark"} />

      {/* Header */}
      <View className="flex-row items-center p-4 border-b border-gray-200 dark:border-gray-800">
        <TouchableOpacity onPress={handleBack} className="p-2">
          <ArrowLeft size={24} color={darkMode ? "#fff" : "#000"} />
        </TouchableOpacity>
        <Text className="text-xl font-bold ml-2 text-gray-900 dark:text-white">
          Settings
        </Text>
      </View>

      <ScrollView className="flex-1">
        {/* Appearance Section */}
        <View className="mt-6 px-4">
          <Text className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            APPEARANCE
          </Text>
          <View className="bg-gray-50 dark:bg-gray-800 rounded-lg">
            <View className="flex-row justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <View className="flex-row items-center">
                <Moon size={20} color={darkMode ? "#fff" : "#4B5563"} />
                <Text className="ml-3 text-gray-900 dark:text-white">
                  Dark Mode
                </Text>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: "#D1D5DB", true: "#10B981" }}
              />
            </View>
          </View>
        </View>

        {/* Language Section */}
        <View className="mt-6 px-4">
          <Text className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            LANGUAGE
          </Text>
          <View className="bg-gray-50 dark:bg-gray-800 rounded-lg">
            <TouchableOpacity
              onPress={handleLanguageSelect}
              className="flex-row justify-between items-center p-4"
            >
              <View className="flex-row items-center">
                <Globe size={20} color={darkMode ? "#fff" : "#4B5563"} />
                <Text className="ml-3 text-gray-900 dark:text-white">
                  Language
                </Text>
              </View>
              <View className="flex-row items-center">
                <Text className="mr-2 text-gray-500 dark:text-gray-400">
                  {language}
                </Text>
                <ChevronRight
                  size={16}
                  color={darkMode ? "#9CA3AF" : "#6B7280"}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Offline Data Section */}
        <View className="mt-6 px-4">
          <Text className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            OFFLINE DATA
          </Text>
          <View className="bg-gray-50 dark:bg-gray-800 rounded-lg">
            <View className="flex-row justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <View className="flex-row items-center">
                <WifiOff size={20} color={darkMode ? "#fff" : "#4B5563"} />
                <Text className="ml-3 text-gray-900 dark:text-white">
                  Enable Offline Mode
                </Text>
              </View>
              <Switch
                value={offlineEnabled}
                onValueChange={setOfflineEnabled}
                trackColor={{ false: "#D1D5DB", true: "#10B981" }}
              />
            </View>

            <TouchableOpacity
              onPress={() => {}}
              className="flex-row justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700"
            >
              <View className="flex-row items-center">
                <HardDrive size={20} color={darkMode ? "#fff" : "#4B5563"} />
                <Text className="ml-3 text-gray-900 dark:text-white">
                  Manage Downloaded Data
                </Text>
              </View>
              <ChevronRight
                size={16}
                color={darkMode ? "#9CA3AF" : "#6B7280"}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleClearCache}
              className="flex-row items-center p-4"
            >
              <Trash size={20} color="#EF4444" />
              <Text className="ml-3 text-red-500">Clear Cache</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Notifications Section */}
        <View className="mt-6 px-4 mb-8">
          <Text className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            NOTIFICATIONS
          </Text>
          <View className="bg-gray-50 dark:bg-gray-800 rounded-lg">
            <View className="flex-row justify-between items-center p-4">
              <View className="flex-row items-center">
                <Bell size={20} color={darkMode ? "#fff" : "#4B5563"} />
                <Text className="ml-3 text-gray-900 dark:text-white">
                  Push Notifications
                </Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: "#D1D5DB", true: "#10B981" }}
              />
            </View>
          </View>
        </View>

        {/* App Info */}
        <View className="mt-2 mb-8 items-center">
          <Text className="text-gray-500 dark:text-gray-400">
            FarmAI v1.0.0
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingsMenu;