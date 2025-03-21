import React, { useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import {
  AlertTriangle,
  Droplets,
  Sun,
  Thermometer,
  Wind,
  Bug,
  Pill,
  Calendar,
} from "lucide-react-native";

interface PlantInfoContentProps {
  activeTab?: string;
  growingConditions?: {
    light: string;
    water: string;
    temperature: string;
    humidity: string;
  };
  commonIssues?: Array<{
    name: string;
    severity: "low" | "medium" | "high";
    description: string;
    solution: string;
    treatment?: string;
    preventionTips?: string[];
  }>;
  isOffline?: boolean;
}

const PlantInfoContent = ({
  activeTab = "growing",
  growingConditions = {
    light: "Full sun to partial shade",
    water: "Regular watering, keep soil moist but not soggy",
    temperature: "65-80°F (18-27°C)",
    humidity: "Medium to high humidity",
  },
  commonIssues = [
    {
      name: "Early Blight",
      severity: "high",
      description:
        "Dark brown spots with concentric rings on lower leaves, which eventually turn yellow and drop.",
      solution:
        "Remove infected leaves. Ensure proper spacing between plants for air circulation.",
      treatment: "Apply copper-based fungicide every 7-10 days.",
      preventionTips: [
        "Rotate crops annually",
        "Use disease-free seeds",
        "Avoid overhead irrigation",
      ],
    },
    {
      name: "Aphid Infestation",
      severity: "medium",
      description:
        "Small green or black insects clustering on stems and new growth, causing leaf curling.",
      solution:
        "Spray plants with strong water stream to dislodge aphids. Introduce beneficial insects.",
      treatment: "Apply insecticidal soap or neem oil solution.",
      preventionTips: [
        "Plant companion crops like marigolds",
        "Maintain field hygiene",
        "Monitor regularly during growing season",
      ],
    },
    {
      name: "Nutrient Deficiency",
      severity: "low",
      description:
        "Yellowing between leaf veins, stunted growth, and poor fruit development.",
      solution:
        "Test soil pH and nutrient levels. Apply appropriate organic or synthetic fertilizers.",
      treatment: "Foliar application of micronutrients for quick absorption.",
      preventionTips: [
        "Regular soil testing",
        "Crop rotation",
        "Use of quality compost",
      ],
    },
  ],
  isOffline = false,
}: PlantInfoContentProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-yellow-200 text-yellow-800";
      case "medium":
        return "bg-orange-200 text-orange-800";
      case "high":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const renderGrowingConditions = () => (
    <View className="p-4 bg-white rounded-lg">
      <View className="flex-row items-center mb-4 pb-3 border-b border-gray-200">
        <Sun size={24} color="#f59e0b" />
        <View className="ml-3">
          <Text className="text-lg font-semibold">Light</Text>
          <Text className="text-gray-600">{growingConditions.light}</Text>
        </View>
      </View>

      <View className="flex-row items-center mb-4 pb-3 border-b border-gray-200">
        <Droplets size={24} color="#3b82f6" />
        <View className="ml-3">
          <Text className="text-lg font-semibold">Water</Text>
          <Text className="text-gray-600">{growingConditions.water}</Text>
        </View>
      </View>

      <View className="flex-row items-center mb-4 pb-3 border-b border-gray-200">
        <Thermometer size={24} color="#ef4444" />
        <View className="ml-3">
          <Text className="text-lg font-semibold">Temperature</Text>
          <Text className="text-gray-600">{growingConditions.temperature}</Text>
        </View>
      </View>

      <View className="flex-row items-center">
        <Wind size={24} color="#8b5cf6" />
        <View className="ml-3">
          <Text className="text-lg font-semibold">Humidity</Text>
          <Text className="text-gray-600">{growingConditions.humidity}</Text>
        </View>
      </View>
    </View>
  );

  const renderCommonIssues = () => (
    <View className="p-4 bg-white rounded-lg">
      {isOffline && (
        <View className="mb-4 bg-yellow-50 p-3 rounded-md">
          <Text className="text-yellow-800 text-center">
            Limited data available in offline mode
          </Text>
        </View>
      )}

      {commonIssues.map((issue, index) => (
        <View
          key={index}
          className={`mb-6 ${index < commonIssues.length - 1 ? "pb-4 border-b border-gray-200" : ""}`}
        >
          <View className="flex-row justify-between items-center mb-2">
            <View className="flex-row items-center">
              <AlertTriangle size={20} color="#f59e0b" />
              <Text className="text-lg font-semibold ml-2">{issue.name}</Text>
            </View>
            <View
              className={`px-3 py-1 rounded-full ${getSeverityColor(issue.severity)}`}
            >
              <Text className="text-xs font-medium capitalize">
                {issue.severity}
              </Text>
            </View>
          </View>

          <Text className="text-gray-700 mb-2">{issue.description}</Text>

          <View className="bg-blue-50 p-3 rounded-md mb-3">
            <Text className="text-blue-800 font-medium">Solution:</Text>
            <Text className="text-blue-700">{issue.solution}</Text>
          </View>

          {issue.treatment && (
            <View className="flex-row items-start mb-3">
              <Pill size={18} color="#4f46e5" style={{ marginTop: 2 }} />
              <View className="ml-2 flex-1">
                <Text className="text-indigo-800 font-medium">Treatment:</Text>
                <Text className="text-indigo-700">{issue.treatment}</Text>
              </View>
            </View>
          )}

          {issue.preventionTips && issue.preventionTips.length > 0 && (
            <View className="mt-2">
              <Text className="text-gray-800 font-medium mb-1">
                Prevention Tips:
              </Text>
              {issue.preventionTips.map((tip, tipIndex) => (
                <View key={tipIndex} className="flex-row items-center mb-1">
                  <View className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                  <Text className="text-gray-700">{tip}</Text>
                </View>
              ))}
            </View>
          )}

          <TouchableOpacity
            className="mt-3 bg-green-100 p-2 rounded-md flex-row items-center justify-center"
            onPress={() => console.log(`Get more info about ${issue.name}`)}
          >
            <Calendar size={16} color="#15803d" />
            <Text className="text-green-800 ml-2 font-medium">
              Treatment Calendar
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView
      className="flex-1 bg-gray-100"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {activeTab === "growing" ||
      activeTab === "growing-conditions" ||
      activeTab === "care-tips" ||
      activeTab === "harvest-info"
        ? renderGrowingConditions()
        : renderCommonIssues()}
    </ScrollView>
  );
};

export default PlantInfoContent;