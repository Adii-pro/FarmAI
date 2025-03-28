# FarmAI: Plant Identification & Care Assistant 🌱

## Overview

FarmAI is a mobile application built with React Native and Expo that empowers farmers to identify plants, diagnose issues, and receive expert care advice through a simple camera scan. The app works both online and offline, making it perfect for remote field use.

## Features

### 🔍 Plant Identification
- Scan plants using your device camera
- Get instant identification results
- View detailed plant information

### 🌡️ Health Diagnostics
- Detect diseases and pests
- Receive severity indicators
- Get treatment recommendations

### 💬 AI Chatbot Assistant
- Ask questions about your plants
- Get personalized farming advice
- Upload additional photos for clarification
- Quick-reply buttons for common questions

### 📱 User-Friendly Interface
- Clean, intuitive camera view
- Detailed plant information screens
- Previous scans gallery
- Customizable settings

### 🌐 Offline Capabilities
- Works without internet connection
- Pre-downloaded essential plant data 
- Visual indicators for offline mode

### 🌍 Multilingual Support
- Multiple language options
- Automatic detection based on device location

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Adii-pro/FarmAI.git
   cd FarmAI
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npx expo start
   ```

4. Run on your device or emulator
   - Scan the QR code with Expo Go app (Android) or Camera app (iOS)
   - Press 'a' for Android emulator
   - Press 'i' for iOS simulator

## Usage

### Scanning Plants
1. Open the app and tap the camera button
2. Position the plant within the frame
3. Tap the scan button
4. View the identification results and health analysis

### Using the AI Assistant
1. Tap the chat button on any plant details screen
2. Type your question or select a quick-reply option
3. Upload additional photos if needed
4. Receive personalized advice

### Offline Mode
1. Go to Settings > Data & Storage
2. Enable Offline Mode
3. Wait for essential data to download
4. Use the app without internet connection

## Technologies Used

- **React Native**: Cross-platform mobile framework
- **Expo**: Development platform for React Native
- **NativeWind**: Tailwind CSS for React Native
- **Expo Router**: File-based routing for Expo apps
- **Lucide React Native**: Icon library
- **Expo Camera**: Camera functionality
- **Expo Haptics**: Haptic feedback
- **React Native Reanimated**: Animations
- **Google Cloud**: AutoML Vision, BigQuery, Cloud Functions
- **Google IDX**: Development Platform

- ### Key Components

- **CameraScreen**: Camera interface for plant scanning
- **PlantDetailsScreen**: Displays plant information and health status
- **AIChatbot**: Conversational interface for plant care advice
- **PreviousScansGallery**: History of previous plant scans
- **SettingsMenu**: User preferences and app configuration
