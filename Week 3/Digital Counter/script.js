let count = 0;

const countDisplay = document.getElementById("count");
const incrementBtn = document.getElementById("increment");
const decrementBtn = document.getElementById("decrement");
const resetBtn = document.getElementById("reset");

incrementBtn.addEventListener("click", () => {
    count++;
    countDisplay.textContent = count;
});

decrementBtn.addEventListener("click", () => {
    if (count > 0) {      // Prevent counter from going below 0
        count--;
        countDisplay.textContent = count;
    }
});

resetBtn.addEventListener("click", () => {
    count = 0;
    countDisplay.textContent = count;
});