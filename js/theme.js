const toggle=document.getElementById("themeToggle");

toggle.addEventListener("click",()=>{

document.documentElement.toggleAttribute("data-theme","dark");

});

const button = document.getElementById("themeToggle");
const root = document.documentElement;

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    root.setAttribute("data-theme", "dark");
}

button.addEventListener("click", () => {
    const isDark = root.getAttribute("data-theme") === "dark";

    if (isDark) {
        root.removeAttribute("data-theme");
        localStorage.setItem("theme", "light");
    } else {
        root.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
    }
});