/**
 * Dynamic Background Configuration for React Native
 *
 * Manages weather-based background images for weather cards.
 * Maps OpenWeatherMap icon codes to appropriate background images and provides
 * image sources optimized for React Native's ImageBackground component.
 */

// ============================================================================
// Imports - Using require() for React Native local assets
// ============================================================================

const backgroundImages = {
  blizzard: require("../assets/backgrounds/blizzard.webp"),
  "clear-day": require("../assets/backgrounds/clear-day.webp"),
  "clear-night": require("../assets/backgrounds/clear-night.webp"),
  "clouds-day": require("../assets/backgrounds/clouds-day.webp"),
  "clouds-night": require("../assets/backgrounds/clouds-night.webp"),
  "drizzle-day": require("../assets/backgrounds/drizzle-day.webp"),
  "drizzle-night": require("../assets/backgrounds/drizzle-night.webp"),
  "fog-mist": require("../assets/backgrounds/fog-mist.webp"),
  "heavy-rain": require("../assets/backgrounds/heavy-rain.webp"),
  overcast: require("../assets/backgrounds/overcast.webp"),
  "rain-day": require("../assets/backgrounds/rain-day.webp"),
  "rain-night": require("../assets/backgrounds/rain-night.webp"),
  "snow-day": require("../assets/backgrounds/snow-day.webp"),
  "snow-night": require("../assets/backgrounds/snow-night.webp"),
  thunderstorm: require("../assets/backgrounds/thunderstorm.webp"),
};

// Default fallback image (using overcast as default)
const defaultBackground = require("../assets/backgrounds/overcast.webp");

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Get background image source for a given weather category
 * 
 * @param {string} category - Weather category from getWeatherCategory()
 * @returns {object} Image source object for React Native ImageBackground
 */
export const getBackgroundImage = (category) => {
  if (!category) {
    return defaultBackground;
  }

  const image = backgroundImages[category];
  return image || defaultBackground;
};

/**
 * Get background image source with fallback
 * 
 * @param {string} category - Weather category from getWeatherCategory()
 * @param {object} fallback - Optional fallback image source
 * @returns {object} Image source object for React Native ImageBackground
 */
export const getBackgroundImageWithFallback = (category, fallback = defaultBackground) => {
  if (!category) {
    return fallback;
  }

  const image = backgroundImages[category];
  return image || fallback;
};

