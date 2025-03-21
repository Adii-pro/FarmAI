import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TrendingUp, TrendingDown, BarChart2 } from "lucide-react-native";

interface MarketPriceWidgetProps {
  onPress?: () => void;
  isOffline?: boolean;
}

const MarketPriceWidget = ({
  onPress,
  isOffline = false,
}: MarketPriceWidgetProps) => {
  // Mock market data - in a real app, this would come from an API
  const marketData = [
    {
      crop: "Tomatoes",
      price: 1.25,
      unit: "kg",
      trend: "up",
      change: 0.15,
    },
    {
      crop: "Maize",
      price: 0.45,
      unit: "kg",
      trend: "down",
      change: 0.05,
    },
    {
      crop: "Beans",
      price: 2.1,
      unit: "kg",
      trend: "up",
      change: 0.2,
    },
    {
      crop: "Cabbage",
      price: 0.75,
      unit: "head",
      trend: "stable",
      change: 0,
    },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp size={16} color="#10b981" />;
      case "down":
        return <TrendingDown size={16} color="#ef4444" />;
      default:
        return <BarChart2 size={16} color="#6b7280" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-xl overflow-hidden shadow-sm mb-4"
    >
      {isOffline && (
        <View className="bg-yellow-100 px-3 py-1">
          <Text className="text-yellow-800 text-xs text-center">
            Market data may not be current (offline mode)
          </Text>
        </View>
      )}

      <View className="p-4">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-lg font-bold text-gray-800">
            Local Market Prices
          </Text>
          <Text className="text-sm text-gray-500">Updated today</Text>
        </View>

        <View className="mb-2">
          {marketData.map((item, index) => (
            <View
              key={index}
              className="flex-row justify-between items-center py-2 border-b border-gray-100"
            >
              <Text className="text-gray-800 font-medium">{item.crop}</Text>
              <View className="flex-row items-center">
                <Text className="text-gray-800 font-bold mr-2">
                  ${item.price}/{item.unit}
                </Text>
                <View className="flex-row items-center">
                  {getTrendIcon(item.trend)}
                  {item.change > 0 && (
                    <Text className={`ml-1 ${getTrendColor(item.trend)}`}>
                      ${item.change}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          ))}
        </View>

        <View className="mt-2">
          <Text className="text-gray-700 font-medium mb-1">
            Market Insight:
          </Text>
          <Text className="text-gray-600 text-sm">
            Tomato prices trending up due to seasonal demand. Consider
            harvesting now for maximum profit.
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MarketPriceWidget;