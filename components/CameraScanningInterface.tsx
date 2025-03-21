import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
  BackHandler,
} from "react-native";
import { useRouter } from "expo-router";
import * as Linking from "expo-linking";
import { ArrowLeft, Zap, ZapOff, Leaf } from "lucide-react-native";
import { BlurView } from "expo-blur";
import { Camera, CameraType, FlashMode } from "expo-camera";
import ScanButton from "./ScanButton";
import ConnectionStatusIndicator from "./ConnectionStatusIndicator";

interface CameraScanningInterfaceProps {
  onScan?: () => void;
  onClose?: () => void;
  isOnline?: boolean;
}

const CameraScanningInterface = ({
  onScan,
  onClose,
  isOnline = true,
}: CameraScanningInterfaceProps) => {
  const router = useRouter();
  const [isScanning, setIsScanning] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const cameraRef = useRef<Camera>(null);
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  // Set up back button handler
  useEffect(() => {
    const backAction = () => {
      handleClose();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  // Frame guide dimensions (70% of screen width)
  const frameWidth = screenWidth * 0.7;
  const frameHeight = frameWidth * 1.3; // 4:3 aspect ratio

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
      if (status !== "granted") {
        Alert.alert(
          "Camera Permission",
          "We need camera access to scan plants. Please enable it in your device settings.",
          [{ text: "OK" }],
        );
      }
    })();
  }, []);

  const takePicture = async () => {
    if (!cameraRef.current) return;

    try {
      setIsScanning(true);
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        skipProcessing: false,
      });

      // In a real app, you would process the image here
      // For demo purposes, we'll just wait a moment and then navigate

      setTimeout(() => {
        setIsScanning(false);
        if (onScan) {
          onScan();
        } else {
          // Navigate to plant details screen if no onScan handler provided
          try {
            // Use direct linking to navigate
            Linking.openURL(Linking.createURL("/plant-details"));
          } catch (error) {
            console.error("Navigation error:", error);
            Alert.alert("Error", "Failed to navigate. Please try again.");
          }
        }
      }, 2000);
    } catch (error) {
      console.error("Error taking picture:", error);
      setIsScanning(false);
      Alert.alert("Error", "Failed to take picture. Please try again.");
    }
  };

  const handleScan = () => {
    if (isScanning) {
      setIsScanning(false);
      return;
    }

    takePicture();
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      try {
        // Try to navigate to home screen using Linking
        Linking.openURL(Linking.createURL("/"));
      } catch (error) {
        console.error("Navigation error:", error);
        Alert.alert("Error", "Failed to navigate. Please try again.");
      }
    }
  };

  if (hasPermission === null) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <Text className="text-white text-lg">
          Requesting camera permission...
        </Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View className="flex-1 bg-black items-center justify-center p-6">
        <Text className="text-white text-lg text-center mb-4">
          Camera access is required to scan plants
        </Text>
        <TouchableOpacity
          className="bg-green-600 py-3 px-6 rounded-lg"
          onPress={() => handleClose()}
        >
          <Text className="text-white font-medium">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      {/* Real camera view */}
      <Camera
        ref={cameraRef}
        type={CameraType.back}
        flashMode={flashOn ? FlashMode.torch : FlashMode.off}
        className="absolute w-full h-full"
        ratio="4:3"
      />

      {/* Header */}
      <View className="absolute top-0 w-full z-10 px-4 pt-12 pb-4 flex-row justify-between items-center bg-black/50">
        <TouchableOpacity onPress={handleClose} className="p-2">
          <ArrowLeft size={24} color="#ffffff" />
        </TouchableOpacity>

        <ConnectionStatusIndicator isOnline={isOnline} />

        <TouchableOpacity onPress={() => setFlashOn(!flashOn)} className="p-2">
          {flashOn ? (
            <Zap size={24} color="#ffffff" />
          ) : (
            <ZapOff size={24} color="#ffffff" />
          )}
        </TouchableOpacity>
      </View>

      {/* Scanning frame guide */}
      <View className="flex-1 items-center justify-center">
        <View
          className="border-2 border-white rounded-lg overflow-hidden"
          style={{ width: frameWidth, height: frameHeight }}
        >
          <View className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-green-500" />
          <View className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-green-500" />
          <View className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-green-500" />
          <View className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-green-500" />
        </View>

        <Text className="text-white text-center mt-4 px-8 text-sm opacity-80">
          Position the plant within the frame for best results
        </Text>
      </View>

      {/* Scanning indicator overlay */}
      {isScanning && (
        <View className="absolute inset-0 bg-black/30 items-center justify-center">
          <View className="bg-black/70 rounded-xl p-6 items-center">
            <Leaf size={40} color="#10b981" className="mb-3" />
            <Text className="text-white text-lg font-medium mb-2">
              Analyzing Crop...
            </Text>
            <Text className="text-white/70 text-sm text-center">
              {isOnline
                ? "Using AI to detect diseases and pests"
                : "Using offline database for basic analysis"}
            </Text>
          </View>
        </View>
      )}

      {/* Bottom controls */}
      <View className="absolute bottom-0 w-full z-10 px-4 pb-10 pt-6 items-center bg-black/50">
        <ScanButton onPress={handleScan} isScanning={isScanning} size={80} />

        <Text className="text-white/70 text-xs mt-6 text-center">
          {isOnline
            ? "Connected to FarmAI for advanced disease detection"
            : "Offline mode: Basic analysis available"}
        </Text>
      </View>
    </View>
  );
};

export default CameraScanningInterface;