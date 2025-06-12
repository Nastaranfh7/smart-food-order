// utils.js

// Creates a countdown timer
// seconds: duration in seconds
// onTick: callback called every second with the remaining time
// onEnd: callback called when countdown finishes
export function createCountdown(seconds, onTick, onEnd) {
  let timeLeft = seconds;

  return function tick() {
    if (timeLeft > 0) {
      onTick(timeLeft);
      timeLeft--;
    } else {
      onEnd();
    }
  };
}
