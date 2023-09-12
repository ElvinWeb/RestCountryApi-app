const modeToggler = document.querySelector(".dark-mode");

modeToggler.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
