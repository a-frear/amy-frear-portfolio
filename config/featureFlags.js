/**
 * Feature Flags Configuration
 *
 * This file controls which features are visible in the application.
 * Set to true to enable, false to hide for now.
 */

export const featureFlags = {
  // Show/hide the reduced motion animation toggle
  SHOW_ANIMATION_TOGGLE: true,

  // Show/hide the side navigation menu
  SHOW_SIDENAV: false,
};

/**
 * Helper function to check if a feature is enabled
 * @param {string} featureName - The name of the feature to check
 * @returns {boolean} - True if the feature is enabled
 */
export function isFeatureEnabled(featureName) {
  return featureFlags[featureName] ?? false;
}
