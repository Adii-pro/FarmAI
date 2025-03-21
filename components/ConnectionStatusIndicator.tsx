import React, { useState, useEffect } from "react";
import { View, Text, Animated } from "react-native";
import { Wifi, WifiOff } from "lucide-react-native";

interface ConnectionStatusIndicatorProps {
  isOnline?: boolean;
  showLabel?: boolean;
}

const ConnectionStatusIndicator = ({
  isOnline = true,
  showLabel = true,
}: ConnectionStatusIndicatorProps) => {
  const [pulseAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    if (!isOnline) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 0.6,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isOnline, pulseAnim]);

  return (
    <View className="flex-row items-center justify-center px-3 py-1.5 rounded-full bg-white/90 border border-gray-200">
      <Animated.View
        style={{
          opacity: pulseAnim,
        }}
        className="mr-2"
      >
        {isOnline ? (
          <Wifi size={16} color="#10b981" />
        ) : (
          <WifiOff size={16} color="#ef4444" />
        )}
      </Animated.View>
      {showLabel && (
        <Text
          className={`text-xs font-medium ${isOnline ? "text-emerald-600" : "text-red-500"}`}
        >
          {isOnline ? "Online" : "Offline"}
        </Text>
      )}
    </View>
  );
};

export default ConnectionStatusIndicator;