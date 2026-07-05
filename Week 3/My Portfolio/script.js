const themeBtn = document.getElementById("theme-toggle");

const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
    document.body.classList.add(savedTheme);
    themeBtn.textContent =
        savedTheme === "dark-theme" ? "☀ Light Mode" : "🌙 Dark Mode";
} else {
    document.body.classList.add("dark-theme");
}

themeBtn.addEventListener("click", () => {
    if (document.body.classList.contains("dark-theme")) {
        document.body.classList.replace("dark-theme", "light-theme");
        themeBtn.textContent = "🌙 Dark Mode";
        localStorage.setItem("theme", "light-theme");
    } else {
        document.body.classList.replace("light-theme", "dark-theme");
        themeBtn.textContent = "☀ Light Mode";
        localStorage.setItem("theme", "dark-theme");
    }
});