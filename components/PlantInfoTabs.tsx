import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

interface TabData {
  id: string;
  label: string;
}

interface PlantInfoTabsProps {
  tabs?: TabData[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

const PlantInfoTabs = ({
  tabs = [
    { id: "growing-conditions", label: "Growing Conditions" },
    { id: "common-issues", label: "Common Issues" },
    { id: "care-tips", label: "Care Tips" },
    { id: "harvest-info", label: "Harvest Info" },
  ],
  activeTab = "growing-conditions",
  onTabChange = () => {},
}: PlantInfoTabsProps) => {
  const [selectedTab, setSelectedTab] = useState(activeTab);

  const handleTabPress = (tabId: string) => {
    setSelectedTab(tabId);
    onTabChange(tabId);
  };

  return (
    <View className="w-full bg-white">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="border-b border-gray-200"
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            onPress={() => handleTabPress(tab.id)}
            className={`px-4 py-3 ${selectedTab === tab.id ? "border-b-2 border-green-600" : ""}`}
            accessibilityRole="tab"
            accessibilityState={{ selected: selectedTab === tab.id }}
          >
            <Text
              className={`text-sm font-medium ${selectedTab === tab.id ? "text-green-600" : "text-gray-600"}`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default PlantInfoTabs;