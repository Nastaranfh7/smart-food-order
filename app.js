import {
  renderFoodList,
  renderOrderSummary,
  showLoadingMessage,
  showErrorMessage,
} from "./ui.js";
import { fetchFoods } from "./api.js";
import { createOrderManager } from "./ordermanager.js";
import { createCountdown } from "./utils.js";

const orderManager = createOrderManager();

// Initial setup after DOM content is loaded
window.addEventListener("DOMContentLoaded", () => {
  renderOrderSummary(); // ✅ Using the correct function
  init();
});

// Retry button for error state
function setupRetryButton() {
  const retryBtn = document.getElementById("retry-btn");
  if (retryBtn) {
    retryBtn.addEventListener("click", () => {
      showLoadingMessage();
      init();
    });
  }
}

// Fetch food data from API
async function init() {
  try {
    showLoadingMessage();
    const foods = await fetchFoods();
    renderFoodList(foods);
  } catch (error) {
    showErrorMessage("❌ Error fetching food data. Please try again.");
    console.error("Error:", error);
    setupRetryButton();
  }
}

// Countdown Timer logic
const countdownEl = document.getElementById("countdown");
const startBtn = document.getElementById("start-timer");

if (startBtn) {
  startBtn.addEventListener("click", () => {
    let intervalId;

    const countdown = createCountdown(
      10,
      (timeLeft) => {
        countdownEl.textContent = `⏳ Time left: ${timeLeft}s`;
      },
      () => {
        countdownEl.textContent = "✅ Food has been delivered!";
        clearInterval(intervalId);
      }
    );

    intervalId = setInterval(countdown, 1000);
  });
}
