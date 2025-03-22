import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { ArrowLeft, Calendar, Search } from "lucide-react-native";
import { useRouter } from "expo-router";

interface ScanItem {
  id: string;
  plantName: string;
  date: string;
  healthStatus: "healthy" | "warning" | "critical";
  imageUrl: string;
}

const PreviousScansGallery = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterActive, setFilterActive] = useState(false);

  // Mock data for previous scans
  const defaultScans: ScanItem[] = [
    {
      id: "1",
      plantName: "Tomato Plant",
      date: "2023-06-15",
      healthStatus: "healthy",
      imageUrl:
        "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400&q=80",
    },
    {
      id: "2",
      plantName: "Corn",
      date: "2023-06-10",
      healthStatus: "warning",
      imageUrl:
        "https://images.unsplash.com/photo-1554402100-8d1d9f3dff80?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "3",
      plantName: "Wheat",
      date: "2023-06-05",
      healthStatus: "healthy",
      imageUrl:
        "https://images.unsplash.com/photo-1561978248-bffcdd0457ad?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "4",
      plantName: "Soybean",
      date: "2023-06-01",
      healthStatus: "critical",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1671130295735-25af5e78d40c?q=80&w=1968&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "5",
      plantName: "Rice",
      date: "2023-05-28",
      healthStatus: "healthy",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1705338026411-00639520a438?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-500";
      case "warning":
        return "bg-yellow-500";
      case "critical":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getHealthStatusText = (status: string) => {
    switch (status) {
      case "healthy":
        return "Healthy";
      case "warning":
        return "Needs Attention";
      case "critical":
        return "Critical";
      default:
        return "Unknown";
    }
  };

  const handleScanPress = (item: ScanItem) => {
    // Navigate to plant details screen with the selected scan
    console.log(`Navigating to details for ${item.plantName}`);
    // Navigate to the details screen with params
    router.push({
      pathname: "/plant-details",
      params: { id: item.id, name: item.plantName },
    });
  };

  const renderScanItem = ({ item }: { item: ScanItem }) => (
    <TouchableOpacity
      className="bg-white rounded-xl overflow-hidden mb-4 shadow-sm"
      onPress={() => handleScanPress(item)}
    >
      <View className="flex-row h-32">
        <Image
          source={{ uri: item.imageUrl }}
          className="w-32 h-full"
          resizeMode="cover"
        />
        <View className="flex-1 p-3 justify-between">
          <View>
            <Text className="text-lg font-bold text-gray-800">
              {item.plantName}
            </Text>
            <View className="flex-row items-center mt-1">
              <Calendar size={14} color="#6B7280" />
              <Text className="text-sm text-gray-500 ml-1">{item.date}</Text>
            </View>
          </View>
          <View className="flex-row items-center">
            <View
              className={`w-3 h-3 rounded-full mr-2 ${getHealthStatusColor(item.healthStatus)}`}
            />
            <Text className="text-sm">
              {getHealthStatusText(item.healthStatus)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" backgroundColor="#F3F4F6" />

      {/* Header */}
      <View className="bg-white p-4 border-b border-gray-200">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="p-2 mr-3">
            <ArrowLeft size={24} color="#374151" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-800">
            Previous Scans
          </Text>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2 mt-3">
          <Search size={20} color="#6B7280" />
          <TouchableOpacity
            className="flex-1"
            onPress={() => setFilterActive(!filterActive)}
          >
            <Text className="ml-2 text-gray-500">
              {searchQuery || "Search plants..."}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Filter Options - Would be expanded in a real implementation */}
        {filterActive && (
          <View className="mt-3 p-3 bg-gray-50 rounded-lg">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Filter by:
            </Text>
            <View className="flex-row flex-wrap">
              <TouchableOpacity className="bg-blue-100 rounded-full px-3 py-1 mr-2 mb-2">
                <Text className="text-blue-800">Date</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-blue-100 rounded-full px-3 py-1 mr-2 mb-2">
                <Text className="text-blue-800">Health Status</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-blue-100 rounded-full px-3 py-1 mr-2 mb-2">
                <Text className="text-blue-800">Plant Type</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      {/* Scan List */}
      <FlatList
        data={defaultScans}
        renderItem={renderScanItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-10">
            <Text className="text-gray-500 text-lg">No scans found</Text>
            <Text className="text-gray-400 text-sm mt-1">
              Start scanning plants to build your history
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default PreviousScansGallery;