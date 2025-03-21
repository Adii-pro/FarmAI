import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  BackHandler,
  Platform,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useRouter, useNavigation } from "expo-router";
import { Camera, CameraType, FlashMode } from "expo-camera";
import { ArrowLeft, Zap, ZapOff, Leaf } from "lucide-react-native";
import * as Haptics from "expo-haptics";

interface CameraScreenProps {
  onScanComplete?: (imageUri: string) => void;
}

const CameraScreen = ({ onScanComplete }: CameraScreenProps) => {
  const router = useRouter();
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const cameraRef = useRef<Camera>(null);

  // Request camera permissions on mount
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // Handle hardware back button
  useEffect(() => {
    // Only add the back handler if we're on Android
    if (Platform.OS !== "android") return;

    const backAction = () => {
      handleBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const handleBack = () => {
    try {
      // Try using navigation.goBack first
      if (navigation && typeof navigation.goBack === "function") {
        navigation.goBack();
        return;
      }

      // Fall back to router if navigation doesn't work
      if (router && typeof router.push === "function") {
        router.push("/");
      } else {
        // Fallback if both navigation methods fail
        console.warn("Navigation methods unavailable, cannot navigate");
        Alert.alert(
          "Navigation Error",
          "Could not navigate back. Please restart the app.",
        );
      }
    } catch (error) {
      console.error("Navigation error:", error);
      // Fallback for any navigation errors
      Alert.alert("Error", "Could not navigate back. Please try again.");
    }
  };

  const toggleFlash = () => {
    setFlashOn(!flashOn);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleScan = async () => {
    if (!cameraRef.current || isScanning) return;

    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      setIsScanning(true);

      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        skipProcessing: false,
      });

      // Simulate processing time
      setTimeout(() => {
        setIsScanning(false);

        if (onScanComplete) {
          onScanComplete(photo.uri);
        } else {
          // Navigate to plant details with the photo URI
          try {
            // Try using navigation first
            if (navigation && typeof navigation.navigate === "function") {
              navigation.navigate("plant-details", { imageUri: photo.uri });
              return;
            }

            // Fall back to router if navigation doesn't work
            if (router && typeof router.push === "function") {
              router.push({
                pathname: "/plant-details",
                params: { imageUri: photo.uri },
              });
            } else {
              console.warn("Navigation methods unavailable, cannot navigate");
              Alert.alert(
                "Navigation Error",
                "Navigation is not available. Please restart the app.",
              );
            }
          } catch (error) {
            console.error("Navigation error:", error);
            Alert.alert("Error", "Failed to navigate. Please try again.");
          }
        }
      }, 1500);
    } catch (error) {
      console.error("Error taking picture:", error);
      setIsScanning(false);
      Alert.alert("Error", "Failed to take picture. Please try again.");
    }
  };

  // Render loading state while checking permissions
  if (hasPermission === null) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <Text className="text-white text-lg">
          Requesting camera permission...
        </Text>
      </View>
    );
  }

  // Render permission denied state
  if (hasPermission === false) {
    return (
      <View className="flex-1 bg-black items-center justify-center p-6">
        <Text className="text-white text-lg text-center mb-4">
          Camera access is required to scan plants
        </Text>
        <TouchableOpacity
          className="bg-green-600 py-3 px-6 rounded-lg"
          onPress={handleBack}
        >
          <Text className="text-white font-medium">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Frame guide dimensions (70% of screen width)
  const frameGuideStyle = {
    width: "70%",
    aspectRatio: 3 / 4,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 8,
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Camera View */}
      <Camera
        ref={cameraRef}
        type={CameraType.back}
        flashMode={flashOn ? FlashMode.torch : FlashMode.off}
        className="absolute inset-0"
        ratio="4:3"
      />

      {/* Header */}
      <View className="w-full z-10 px-4 pt-12 pb-4 flex-row justify-between items-center bg-black/50">
        <TouchableOpacity onPress={handleBack} className="p-2">
          <ArrowLeft size={24} color="#ffffff" />
        </TouchableOpacity>

        <Text className="text-white font-medium">Scan Plant</Text>

        <TouchableOpacity onPress={toggleFlash} className="p-2">
          {flashOn ? (
            <Zap size={24} color="#ffffff" />
          ) : (
            <ZapOff size={24} color="#ffffff" />
          )}
        </TouchableOpacity>
      </View>

      {/* Scanning Frame Guide */}
      <View className="flex-1 items-center justify-center">
        <View style={frameGuideStyle}>
          <View className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-green-500" />
          <View className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-green-500" />
          <View className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-green-500" />
          <View className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-green-500" />
        </View>

        <Text className="text-white text-center mt-4 px-8 text-sm opacity-80">
          Position the plant within the frame for best results
        </Text>
      </View>

      {/* Scanning Overlay */}
      {isScanning && (
        <View className="absolute inset-0 bg-black/30 items-center justify-center">
          <View className="bg-black/70 rounded-xl p-6 items-center">
            <Leaf size={40} color="#10b981" className="mb-3" />
            <Text className="text-white text-lg font-medium mb-2">
              Analyzing Plant...
            </Text>
            <Text className="text-white/70 text-sm text-center">
              Using AI to identify your plant
            </Text>
          </View>
        </View>
      )}

      {/* Capture Button */}
      <View className="w-full z-10 px-4 pb-10 pt-6 items-center bg-black/50">
        <TouchableOpacity
          onPress={handleScan}
          disabled={isScanning}
          className={`rounded-full items-center justify-center ${isScanning ? "bg-gray-500" : "bg-green-500"}`}
          style={{
            width: 80,
            height: 80,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          {isScanning ? (
            <View className="h-10 w-10 rounded-sm bg-white" />
          ) : (
            <View className="h-16 w-16 rounded-full border-4 border-white" />
          )}
        </TouchableOpacity>

        <Text className="text-white/70 text-xs mt-6 text-center">
          Tap to scan and identify plant
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default CameraScreen;
