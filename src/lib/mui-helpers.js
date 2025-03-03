/**
 * This file contains helpers to ensure MUI and Emotion styles work properly
 * throughout the application, especially in Storybook
 */

// This creates a cache for emotion styles to use in Storybook
import createCache from '@emotion/cache';

export const createEmotionCache = () => {
  return createCache({
    key: 'css',
    prepend: true, // This ensures MUI styles are loaded first
  });
};