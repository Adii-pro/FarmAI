import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Cloud, CloudRain, Sun, Thermometer, Wind } from "lucide-react-native";

interface WeatherWidgetProps {
  location?: string;
  isOffline?: boolean;
  onPress?: () => void;
}

const WeatherWidget = ({
  location = "Your Farm",
  isOffline = false,
  onPress,
}: WeatherWidgetProps) => {
  // Mock weather data - in a real app, this would come from an API
  const weatherData = {
    currentTemp: 28,
    condition: "Partly Cloudy",
    precipitation: 20,
    humidity: 65,
    windSpeed: 8,
    forecast: [
      { day: "Today", temp: 28, condition: "cloudy" },
      { day: "Tomorrow", temp: 30, condition: "sunny" },
      { day: "Wed", temp: 27, condition: "rainy" },
    ],
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun size={24} color="#f59e0b" />;
      case "rainy":
        return <CloudRain size={24} color="#3b82f6" />;
      case "cloudy":
      default:
        return <Cloud size={24} color="#6b7280" />;
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
            Weather data may not be current (offline mode)
          </Text>
        </View>
      )}

      <View className="p-4">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-lg font-bold text-gray-800">{location}</Text>
          <Text className="text-sm text-gray-500">Updated 2h ago</Text>
        </View>

        <View className="flex-row justify-between items-center mb-4">
          <View className="flex-row items-center">
            {getWeatherIcon(weatherData.condition)}
            <Text className="text-3xl font-bold ml-2 text-gray-800">
              {weatherData.currentTemp}°C
            </Text>
          </View>

          <View>
            <Text className="text-gray-600">{weatherData.condition}</Text>
            <View className="flex-row items-center">
              <CloudRain size={14} color="#3b82f6" />
              <Text className="text-gray-600 ml-1">
                {weatherData.precipitation}% precip.
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-row justify-between pt-3 border-t border-gray-100">
          {weatherData.forecast.map((day, index) => (
            <View key={index} className="items-center">
              <Text className="text-gray-600 mb-1">{day.day}</Text>
              {getWeatherIcon(day.condition)}
              <Text className="text-gray-800 font-medium mt-1">
                {day.temp}°C
              </Text>
            </View>
          ))}
        </View>

        <View className="mt-3 pt-3 border-t border-gray-100">
          <Text className="text-gray-700 font-medium mb-2">
            Farming Conditions:
          </Text>
          <Text className="text-gray-600 text-sm">
            Good conditions for irrigation. Consider delaying pesticide
            application due to possible rain tomorrow.
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default WeatherWidget;