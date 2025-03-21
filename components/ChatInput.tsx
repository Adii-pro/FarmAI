import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Camera, Send, Image as ImageIcon, Mic } from "lucide-react-native";

interface ChatInputProps {
  onSendMessage?: (message: string) => void;
  onUploadPhoto?: () => void;
  onRecordVoice?: () => void;
  placeholder?: string;
  disabled?: boolean;
}

const ChatInput = ({
  onSendMessage = () => {},
  onUploadPhoto = () => {},
  onRecordVoice = () => {},
  placeholder = "Ask about this plant...",
  disabled = false,
}: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <View className="flex-row items-center p-2 bg-white border-t border-gray-200">
        <TouchableOpacity
          onPress={onUploadPhoto}
          className="p-2 rounded-full bg-gray-100 mr-2"
          disabled={disabled}
        >
          <ImageIcon size={20} color="#4B5563" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onRecordVoice}
          className="p-2 rounded-full bg-gray-100 mr-2"
          disabled={disabled}
        >
          <Mic size={20} color="#4B5563" />
        </TouchableOpacity>

        <View className="flex-1 flex-row items-center bg-gray-100 rounded-full px-3 py-1">
          <TextInput
            className="flex-1 py-2 px-1 text-base text-gray-800"
            placeholder={placeholder}
            placeholderTextColor="#9CA3AF"
            value={message}
            onChangeText={setMessage}
            multiline
            maxLength={500}
            editable={!disabled}
          />
        </View>

        <TouchableOpacity
          onPress={handleSend}
          className={`p-2 rounded-full ml-2 ${message.trim() ? "bg-green-500" : "bg-gray-300"}`}
          disabled={!message.trim() || disabled}
        >
          <Send size={20} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatInput;