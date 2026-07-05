const changeBtn = document.getElementById("changeBtn");
const copyBtn = document.getElementById("copyBtn");
const colorCode = document.getElementById("colorCode");

function randomColor() {
    let letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

changeBtn.addEventListener("click", () => {
    let newColor = randomColor();

    document.body.style.backgroundColor = newColor;
    colorCode.textContent = newColor;
});

copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(colorCode.textContent);

    alert("HEX Code Copied: " + colorCode.textContent);
});