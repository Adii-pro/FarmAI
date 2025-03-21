import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import {
  Camera,
  ChevronRight,
  Leaf,
  MessageSquare,
  WifiOff,
} from "lucide-react-native";

interface OnboardingSlide {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  image?: string;
}

interface OnboardingTutorialProps {
  onComplete?: () => void;
  isVisible?: boolean;
}

const OnboardingTutorial = ({
  onComplete = () => {},
  isVisible = true,
}: OnboardingTutorialProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();
  const { width } = Dimensions.get("window");

  const slides: OnboardingSlide[] = [
    {
      id: 1,
      title: "Welcome to FarmAI",
      description:
        "Detect crop diseases, identify pests, and get personalized farming advice with a simple camera scan.",
      icon: <Camera size={48} color="#22c55e" />,
      image:
        "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=600&q=80",
    },
    {
      id: 2,
      title: "Crop Disease Detection",
      description:
        "Point your camera at your crops to instantly detect diseases and pests, with treatment recommendations.",
      icon: <Leaf size={48} color="#22c55e" />,
      image:
        "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&q=80",
    },
    {
      id: 3,
      title: "Multilingual Farm Assistant",
      description:
        "Get personalized farming advice in your local language. Ask questions and upload photos for detailed guidance.",
      icon: <MessageSquare size={48} color="#22c55e" />,
      image:
        "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=600&q=80",
    },
    {
      id: 4,
      title: "Works Offline",
      description:
        "Access essential plant information even without internet connection. Perfect for remote field use.",
      icon: <WifiOff size={48} color="#22c55e" />,
      image:
        "https://images.unsplash.com/photo-1530968033775-2c92736b131e?w=600&q=80",
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  if (!isVisible) return null;

  return (
    <View className="flex-1 bg-white">
      {/* Progress indicators */}
      <View className="flex-row justify-center mt-10 mb-4">
        {slides.map((_, index) => (
          <View
            key={index}
            className={`h-2 mx-1 rounded-full ${currentSlide === index ? "w-6 bg-green-500" : "w-2 bg-gray-300"}`}
          />
        ))}
      </View>

      {/* Current slide */}
      <Animated.View
        entering={FadeIn.duration(400)}
        exiting={FadeOut.duration(400)}
        className="flex-1 px-6"
      >
        <View className="items-center justify-center mb-8">
          {slides[currentSlide].icon}
        </View>

        {slides[currentSlide].image && (
          <View className="items-center justify-center mb-8 overflow-hidden rounded-2xl">
            <Image
              source={{ uri: slides[currentSlide].image }}
              className="w-full h-56 rounded-2xl"
              resizeMode="cover"
            />
          </View>
        )}

        <Text className="text-3xl font-bold text-center text-gray-800 mb-4">
          {slides[currentSlide].title}
        </Text>

        <Text className="text-lg text-center text-gray-600 mb-8">
          {slides[currentSlide].description}
        </Text>
      </Animated.View>

      {/* Navigation buttons */}
      <View className="flex-row justify-between items-center px-6 pb-12">
        <TouchableOpacity onPress={handleSkip}>
          <Text className="text-gray-500 text-lg">Skip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNext}
          className="flex-row items-center justify-center bg-green-500 px-6 py-3 rounded-full"
        >
          <Text className="text-white text-lg font-medium mr-2">
            {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
          </Text>
          <ChevronRight size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingTutorial;
