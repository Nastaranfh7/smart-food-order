/**
 * OrderManager Module
 * This module uses closure to encapsulate and manage a private order list.
 */

function createOrderManager() {
  // Private order list (not directly accessible from outside)
  const order = [];

  /**
   * Add a food item to the order list
   * @param {Object} item - The food item object with properties like id, name, price
   */
  function addItem(item) {
    order.push(item);
  }

  /**
   * Get a copy of the current order list
   * @returns {Array} - A shallow copy of the order list
   */
  function getItem() {
    return [...order];
  }

  /**
   * Remove a specific item from the order list based on its id
   * @param {Object} itemToRemove - The item to be removed (matched by id)
   */
  function removeItem(itemToRemove) {
    const index = order.findIndex(item => item.id === itemToRemove.id);
    if (index !== -1) {
      order.splice(index, 1);
    }
  }

  // Public API
  return {
    addItem,
    getItem,
    removeItem,
  };
}

export { createOrderManager };
