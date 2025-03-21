import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { ArrowLeft, Info } from "lucide-react-native";

interface PlantHeaderProps {
  plantName?: string;
  scientificName?: string;
  healthStatus?: "healthy" | "moderate" | "poor";
  plantImage?: string;
  onBackPress?: () => void;
  onInfoPress?: () => void;
}

const PlantHeader = ({
  plantName = "Tomato Crop",
  scientificName = "Solanum lycopersicum",
  healthStatus = "moderate",
  plantImage = "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=800&q=80",
  onBackPress = () => {},
  onInfoPress = () => {},
}: PlantHeaderProps) => {
  // Map health status to color
  const healthColors = {
    healthy: "bg-green-500",
    moderate: "bg-yellow-500",
    poor: "bg-red-500",
  };

  const healthLabels = {
    healthy: "Healthy",
    moderate: "Needs Attention",
    poor: "Critical",
  };

  return (
    <View className="bg-white w-full h-[200px]">
      {/* Background Image with Overlay */}
      <Image
        source={{ uri: plantImage }}
        className="absolute w-full h-full"
        style={{ opacity: 0.8 }}
      />
      <View className="absolute w-full h-full bg-black/30" />

      {/* Header Content */}
      <View className="flex-1 p-4 justify-between">
        {/* Top Navigation */}
        <View className="flex-row justify-between items-center">
          <TouchableOpacity
            onPress={onBackPress}
            className="w-10 h-10 bg-black/20 rounded-full items-center justify-center"
          >
            <ArrowLeft size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onInfoPress}
            className="w-10 h-10 bg-black/20 rounded-full items-center justify-center"
          >
            <Info size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Plant Information */}
        <View className="mb-2">
          <Text className="text-white text-2xl font-bold">{plantName}</Text>
          <Text className="text-white/80 text-sm italic">{scientificName}</Text>

          <View className="flex-row items-center mt-2">
            <View
              className={`w-3 h-3 rounded-full mr-2 ${healthColors[healthStatus]}`}
            />
            <Text className="text-white text-sm">
              {healthLabels[healthStatus]}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PlantHeader;