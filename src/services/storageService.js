/**
 * Centralized Storage Service
 * Handles localStorage operations safely with in-memory fallback.
 */

const memoryStorage = new Map();

export const storageService = {
  getItem: (key, defaultValue = null) => {
    try {
      const item = window.localStorage.getItem(key);
      if (item === null || item === undefined) return defaultValue;
      return JSON.parse(item);
    } catch (error) {
      console.warn(`[storageService] Error reading key "${key}":`, error);
      return memoryStorage.has(key) ? memoryStorage.get(key) : defaultValue;
    }
  },

  setItem: (key, value) => {
    try {
      const serialized = JSON.stringify(value);
      window.localStorage.setItem(key, serialized);
      memoryStorage.set(key, value);
    } catch (error) {
      console.warn(`[storageService] Error saving key "${key}":`, error);
      memoryStorage.set(key, value);
    }
  },

  removeItem: (key) => {
    try {
      window.localStorage.removeItem(key);
      memoryStorage.delete(key);
    } catch (error) {
      console.warn(`[storageService] Error removing key "${key}":`, error);
      memoryStorage.delete(key);
    }
  },

  clear: () => {
    try {
      window.localStorage.clear();
      memoryStorage.clear();
    } catch (error) {
      console.warn('[storageService] Error clearing storage:', error);
      memoryStorage.clear();
    }
  }
};
