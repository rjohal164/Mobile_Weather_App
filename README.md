# Weather App

A modern, feature-rich mobile weather application built with React Native and Expo. Get real-time weather updates, detailed forecasts, and manage your favorite cities all in one beautiful, intuitive interface.

## Description

Weather App is a cross-platform mobile application that provides comprehensive weather information for locations worldwide. The app leverages GPS technology to show current weather conditions for your location, allows you to search for any city, and provides detailed forecasts including hourly and multi-day predictions. With a focus on user experience, the app features haptic feedback, beautiful gradient backgrounds, and smooth navigation.

## Features

### Core Weather Features
- **Current Weather Display** - Real-time weather information based on your GPS location or selected city
- **Multiple Forecast Views** - Switch between current, 3-day, and 5-day forecast views
- **Hourly Forecasts** - Detailed hourly weather predictions for the next 8 hours
- **City Search** - Search and select any city worldwide with autocomplete functionality
- **Favorite Cities** - Save up to 5 favorite cities for quick access
- **Temperature Scale Toggle** - Switch between Celsius and Fahrenheit
- **Detailed Weather Information** - View humidity, pressure, visibility, wind speed and direction, sunrise/sunset times, and cloudiness
- **Dynamic Backgrounds** - Weather-appropriate background images that change based on current conditions

### Navigation Features
- **Bottom Tab Navigation** - Easy access to main app sections (Current Location, Weather, Favorites, About)
- **Native Stack Navigation** - Smooth screen transitions and navigation flow
- **Welcome Screen** - Onboarding experience for first-time users

### User Experience Features
- **Haptic Feedback** - Tactile feedback on interactive elements (buttons, toggles, selections) for enhanced user interaction
- **Linear Gradient Backgrounds** - Beautiful gradient backgrounds throughout the UI for a modern, polished look
- **Safe Area Handling** - Proper display on devices with notches and status bars
- **Pull-to-Refresh** - Refresh weather data by pulling down on the current location screen
- **Status Bar Control** - Automatic status bar styling that adapts to the app's theme

### Data Persistence
- **Local Storage** - Favorite cities are saved locally and persist across app restarts
- **Saved Preferences** - Your temperature scale preference is remembered
- **City Memory** - Last selected city is automatically saved and restored

### Location Services
- **GPS-Based Weather** - Automatic weather updates based on your current location
- **Location Permission Handling** - Graceful permission requests with clear error messages
- **Manual Location Refresh** - Refresh button to update your current location weather

### UI/UX Enhancements
- **Vector Icons** - Beautiful Ionicons throughout the interface for consistent visual language
- **Responsive Card-Based Layouts** - Modern card design that adapts to different screen sizes
- **Loading States** - Clear loading indicators while fetching weather data
- **Error Handling** - User-friendly error messages with retry options
- **Empty States** - Helpful guidance when no data is available (e.g., no favorites yet)

## Technology Stack

### Core Framework
- **React Native** - Cross-platform mobile development framework
- **Expo** (~54.0.13) - Development platform and toolchain for React Native

### Navigation
- **React Navigation** - Navigation library for React Native
  - `@react-navigation/bottom-tabs` - Bottom tab navigation
  - `@react-navigation/native-stack` - Native stack navigation

### API & Services
- **OpenWeatherMap API** - Weather data and forecasts

### Storage & Persistence
- **AsyncStorage** - Local data persistence for favorites and preferences

### Location Services
- **Expo Location** - GPS and location services

### UI & UX Libraries
- **Expo Haptics** - Haptic feedback for enhanced user interaction
- **Expo Linear Gradient** - Beautiful gradient backgrounds
- **React Native Safe Area Context** - Safe area handling for modern devices
- **Expo Status Bar** - Status bar styling and control
- **@expo/vector-icons** - Icon library (Ionicons)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** - Version compatible with Expo (recommended: LTS version)
- **npm** or **yarn** - Package manager
- **Expo CLI** - Can be installed globally or used via `npx`
- **OpenWeatherMap API Key** - Free tier available at [OpenWeatherMap](https://openweathermap.org/api)
- **For Mobile Testing:**
  - **Expo Go app** on iOS/Android device, OR
  - **iOS Simulator** (macOS only) or **Android Emulator**

## Installation

Follow these steps to set up the project locally:

1. **Clone or download the repository**
   ```bash
   git clone https://github.com/rjohal164/Mobile_Weather_App.git
   cd "Mobile App"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy the example environment file:
     ```bash
     cp .env.example .env
     ```
   - Or manually create a `.env` file in the root directory

4. **Get your OpenWeatherMap API key**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Navigate to API keys section
   - Copy your API key

5. **Configure your API key**
   - Open the `.env` file
   - Add your API key:
     ```
     EXPO_PUBLIC_OPENWEATHER_API_KEY=your_actual_api_key_here
     ```
   - Save the file

6. **Start the development server**
   ```bash
   npm start
   ```
   or
   ```bash
   expo start
   ```

## Configuration

### Environment Variables

The app requires one environment variable:

- `EXPO_PUBLIC_OPENWEATHER_API_KEY` - Your OpenWeatherMap API key

**Important Notes:**
- The `.env` file should be in the root directory of the project
- After creating or modifying the `.env` file, you must restart the Expo development server
- The `EXPO_PUBLIC_` prefix is required for Expo to expose the variable to your app
- Never commit your `.env` file to version control (it should be in `.gitignore`)

### Getting an OpenWeatherMap API Key

1. Go to [https://openweathermap.org/api](https://openweathermap.org/api)
2. Click "Sign Up" to create a free account
3. After signing up, go to the API keys section in your account dashboard
4. Copy your default API key or create a new one
5. The free tier includes 60 calls per minute, which is sufficient for development and personal use

## Usage

### Running the Application

Once the development server is running, you have several options:

#### Using Expo Go (Recommended for Quick Testing)
1. Install **Expo Go** app on your iOS or Android device
2. Scan the QR code displayed in the terminal or browser
3. The app will load on your device

#### Using iOS Simulator (macOS only)
```bash
npm run ios
```
or press `i` in the Expo CLI

#### Using Android Emulator
```bash
npm run android
```
or press `a` in the Expo CLI

#### Using Web Browser
```bash
npm run web
```
or press `w` in the Expo CLI

### Basic App Usage

1. **View Current Location Weather**
   - Open the app and navigate to the "Current Location" tab
   - Grant location permissions when prompted
   - Your current weather will be displayed automatically
   - Pull down to refresh the weather data

2. **Search for a City**
   - Go to the "Weather" tab
   - Use the search bar at the top
   - Type a city name and select from the dropdown
   - The weather for that city will be displayed

3. **Add Favorite Cities**
   - While viewing a city's weather, tap the heart icon
   - The city will be added to your favorites (up to 5 cities)
   - Access favorites from the "Favorites" tab

4. **Switch Forecast Views**
   - On the Weather tab, use the view controls
   - Toggle between Current, 3-Day, and 5-Day forecasts

5. **Change Temperature Scale**
   - Tap the temperature scale toggle (C/F) in the header
   - Your preference will be saved automatically

6. **View Detailed Weather Information**
   - Scroll down on any weather screen to see detailed metrics
   - Includes humidity, pressure, visibility, wind, and more

## Project Structure

```
Mobile App/
├── assets/                 # Images, icons, and background assets
│   ├── backgrounds/        # Weather-based background images
│   └── static-backgrounds/ # Static UI background images
├── components/             # Reusable React components
│   ├── cards/             # Weather card components
│   ├── layout/            # Layout components
│   ├── search/            # Search-related components
│   ├── ui/                # UI components (buttons, toggles, etc.)
│   └── views/             # Forecast view components
├── config/                # Configuration files
├── context/               # React Context providers
├── hooks/                 # Custom React hooks
├── Navigation/            # Navigation configuration
├── screens/               # Main screen components
├── services/              # API service functions
├── utils/                 # Utility functions
├── App.js                 # Main app component
├── app.json               # Expo configuration
├── package.json           # Dependencies and scripts
└── README.md              # This file
```

## Additional Information

### Location Permissions

The app requires location permissions to provide weather data for your current location:

- **iOS**: The app will request "When In Use" location permission
- **Android**: The app requires "Fine Location" or "Coarse Location" permission

You can deny location permissions and still use the app by manually searching for cities.

### API Rate Limits

OpenWeatherMap free tier includes:
- 60 API calls per minute
- 1,000,000 calls per month

For normal app usage, these limits are more than sufficient. If you encounter rate limit errors, wait a minute before making additional requests.

### Troubleshooting

**App won't start:**
- Ensure all dependencies are installed: `npm install`
- Check that your Node.js version is compatible with Expo
- Try clearing the cache: `npx expo start --clear`

**API errors:**
- Verify your API key is correctly set in the `.env` file
- Ensure the `.env` file is in the root directory
- Restart the development server after modifying `.env`
- Check that your API key is valid and active on OpenWeatherMap

**Location not working:**
- Grant location permissions in your device settings
- Ensure location services are enabled on your device
- For iOS Simulator, set a location in Features > Location

**Build errors:**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear Expo cache: `npx expo start --clear`
- Check that all dependencies in `package.json` are compatible

### Known Limitations

- Maximum of 5 favorite cities can be saved
- Weather data is dependent on OpenWeatherMap API availability
- Some features may have limited functionality on web platform
- Location services require device permissions and may not work in all environments

---



