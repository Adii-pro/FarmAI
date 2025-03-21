import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  SafeAreaView,
} from "react-native";
import { router, useNavigation } from "expo-router";
import { Camera, CameraType, FlashMode } from "expo-camera";
import { ArrowLeft, Zap, ZapOff } from "lucide-react-native";
import * as Haptics from "expo-haptics";

const SimpleCameraScreen = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [flashOn, setFlashOn] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const cameraRef = useRef<Camera>(null);

  // Request camera permissions
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBack = () => {
    try {
      // Navigate directly to home instead of using back()
      router.replace("/");
    } catch (error) {
      console.error("Navigation error:", error);
      // Last resort fallback with delay
      setTimeout(() => {
        try {
          router.replace("/");
        } catch (retryError) {
          console.error("Failed all navigation attempts", retryError);
        }
      }, 100);
    }
  };

  const toggleFlash = () => {
    setFlashOn(!flashOn);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const takePicture = async () => {
    if (!cameraRef.current || isCapturing) return;

    try {
      setIsCapturing(true);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      const result = await cameraRef.current.takePictureAsync({
        quality: 0.8,
      });

      setPhoto(result.uri);
      setIsCapturing(false);
    } catch (error) {
      console.error("Error taking picture:", error);
      setIsCapturing(false);
    }
  };

  const handleConfirm = () => {
    if (photo) {
      try {
        router.replace({
          pathname: "/plant-details",
          params: { imageUri: photo },
        });
      } catch (error) {
        console.error("Navigation error:", error);
        // Try alternative navigation method
        try {
          if (navigation && navigation.navigate) {
            navigation.navigate("plant-details", { imageUri: photo });
          } else {
            console.error("All navigation methods failed");
          }
        } catch (navError) {
          console.error("Alternative navigation failed:", navError);
        }
      }
    }
  };

  const handleRetake = () => {
    setPhoto(null);
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

  return (
    <SafeAreaView className="flex-1 bg-black">
      {photo ? (
        // Photo preview screen
        <View className="flex-1">
          <Image
            source={{ uri: photo }}
            className="absolute inset-0 w-full h-full"
          />
          <View className="absolute top-0 w-full z-10 px-4 pt-12 pb-4 flex-row justify-between items-center bg-black/50">
            <TouchableOpacity onPress={handleRetake} className="p-2">
              <ArrowLeft size={24} color="#ffffff" />
            </TouchableOpacity>
            <Text className="text-white font-medium">Preview</Text>
            <View style={{ width: 32 }} />
          </View>
          <View className="absolute bottom-0 w-full z-10 px-4 pb-10 pt-6 flex-row justify-center items-center bg-black/50">
            <TouchableOpacity
              onPress={handleRetake}
              className="bg-white/20 rounded-full px-6 py-3 mr-4"
            >
              <Text className="text-white font-medium">Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleConfirm}
              className="bg-green-500 rounded-full px-6 py-3"
            >
              <Text className="text-white font-medium">Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        // Camera screen
        <View className="flex-1">
          <Camera
            ref={cameraRef}
            type={CameraType.back}
            flashMode={flashOn ? FlashMode.torch : FlashMode.off}
            className="absolute inset-0"
            ratio="4:3"
          />

          {/* Header */}
          <View className="absolute top-0 w-full z-10 px-4 pt-12 pb-4 flex-row justify-between items-center bg-black/50">
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
            <View className="w-[70%] aspect-[3/4] border-2 border-white rounded-lg">
              <View className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-green-500" />
              <View className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-green-500" />
              <View className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-green-500" />
              <View className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-green-500" />
            </View>

            <Text className="text-white text-center mt-4 px-8 text-sm opacity-80">
              Position the plant within the frame for best results
            </Text>
          </View>

          {/* Capture Button */}
          <View className="absolute bottom-0 w-full z-10 px-4 pb-10 pt-6 items-center bg-black/50">
            <TouchableOpacity
              onPress={takePicture}
              disabled={isCapturing}
              className={`rounded-full items-center justify-center ${isCapturing ? "bg-gray-500" : "bg-green-500"}`}
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
              <View className="h-16 w-16 rounded-full border-4 border-white" />
            </TouchableOpacity>

            <Text className="text-white/70 text-xs mt-6 text-center">
              Tap to scan and identify plant
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SimpleCameraScreen;