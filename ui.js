// ui.js

import { createOrderManager } from './ordermanager.js';

const orderManager = createOrderManager();
const foodListElement = document.getElementById('food-list');

function addToOrder(item) {
  orderManager.addItem(item);
  renderOrderSummary();
}

export function renderFoodList(foodItems) {
  foodListElement.innerHTML = '';

  foodItems.forEach(item => {
    const foodCard = document.createElement('div');
    foodCard.className = 'food-card';

    foodCard.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <span>Price: $${item.price}</span>
      <button class="add-to-order-btn" data-id="${item.id}">Add to Order</button>
    `;

    foodCard.querySelector('.add-to-order-btn').addEventListener('click', () => {
      addToOrder(item);
    });

    foodListElement.appendChild(foodCard);
  });
}

export function renderOrderSummary() {
  const orderContainer = document.querySelector('.order-items');
  orderContainer.innerHTML = '';

  const items = orderManager.getItem();

  if (items.length === 0) {
    orderContainer.textContent = 'Your order is empty';
    return;
  }

  items.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'order-item';

    const nameSpan = document.createElement('span');
    nameSpan.textContent = `${item.name} - $${item.price.toFixed(2)}`;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = '❌';
    removeBtn.className = 'remove-btn';

    removeBtn.addEventListener('click', () => {
      orderManager.removeItem(item);
      renderOrderSummary();
    });

    itemDiv.appendChild(nameSpan);
    itemDiv.appendChild(removeBtn);
    orderContainer.appendChild(itemDiv);
  });

  const total = items.reduce((sum, item) => sum + item.price, 0);
  const totalDiv = document.createElement('div');
  totalDiv.className = 'order-total';
  totalDiv.textContent = `Total: $${total.toFixed(2)}`;
  orderContainer.appendChild(totalDiv);
}

export function showErrorMessage(message) {
  foodListElement.innerHTML = `
    <p style="color: red;">${message}</p>
    <button id="retry-btn">تلاش دوباره</button>
  `;
}

export function showLoadingMessage(message = "در حال بارگذاری غذاها...") {
  foodListElement.innerHTML = `<p style="color: green;">${message}</p>`;
}


export { renderOrderSummary as updateOrderUI };
