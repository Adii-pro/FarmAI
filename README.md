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
- Automatic detection based on device locale

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/farmAI.git
   cd farmscan
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

## Project Structure

```
├── app/                  # Main application screens (file-based routing)
├── assets/               # Static assets (images, fonts)
├── components/           # Reusable UI components
├── context/              # React context providers
├── global.css            # Global styles
└── README.md             # Project documentation
```

### Key Components

- **CameraScreen**: Camera interface for plant scanning
- **PlantDetailsScreen**: Displays plant information and health status
- **AIChatbot**: Conversational interface for plant care advice
- **PreviousScansGallery**: History of previous plant scans
- **SettingsMenu**: User preferences and app configuration

## Development

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Environment Setup

Follow the [React Native Environment Setup](https://reactnative.dev/docs/environment-setup) guide to set up your development environment.

### Building for Production

```bash
eas build --platform android  # For Android
eas build --platform ios      # For iOS
```

## Troubleshooting

### Common Issues

- **Camera Permission Denied**: Ensure you've granted camera permissions in your device settings
- **Offline Mode Not Working**: Check if you've downloaded the essential data before going offline
- **Scan Not Working**: Make sure the plant is well-lit and positioned within the frame