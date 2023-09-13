const $HTML = document.documentElement;
const modeToggler = document.querySelector(".dark-mode");
const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (sessionStorage.getItem("theme")) {
  $HTML.dataset.theme = sessionStorage.getItem("theme");
} else {
  $HTML.dataset.theme = isDark ? "light" : "dark";

}

let isPressed = false;
const switchTheme = function () {
  isPressed = isPressed ? false : true;
  this.setAttribute("aria-pressed", isPressed);
  $HTML.setAttribute(
    "data-theme",
    $HTML.dataset.theme === "light" ? "dark" : "light"
  );
  sessionStorage.setItem("theme", $HTML.dataset.theme);
};

window.addEventListener("load", () => {
  modeToggler.addEventListener("click", switchTheme);
});
