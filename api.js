import { foodItems } from './data.js';

/**
 * Simulates fetching food items from a server with a 1.5 second delay and error possibility
 * @returns {Promise<Array>} Promise resolving to an array of food items
 */
export function fetchFoods() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 90% chance of success, 10% chance of failure
      const success = Math.random() < 0.9;

      if (success) {
        resolve(foodItems);
      } else {
        reject("❌ Error loading food items. Please try again.");
      }
    }, 1500);
  });
}
