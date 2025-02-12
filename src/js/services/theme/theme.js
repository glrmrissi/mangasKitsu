const toggleTheme = document.getElementById("toggle_theme");

const body = document.body;

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  body.setAttribute("data-theme", savedTheme);
}

const fillWhite = document.querySelectorAll(".fillWhite")


toggleTheme.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";

  if (newTheme === "light") {
    fillWhite.forEach(el => {
      el.classList.remove("fillWhite");
      toggleTheme.src = "src/icon/cloud-sun-fill.svg"
    });
  } else {
    fillWhite.forEach(el => {
      el.classList.add("fillWhite");
      toggleTheme.src = "src/icon/cloud-moon-fill.svg"
    });
  }
  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
});

const foreachtest = fillWhite.forEach(el => {el.classList.remove("fillWhite");});

fillWhite.forEach(el => {
  el.classList.remove("fillWhite");
});
if (savedTheme === "light") {
} else {
  fillWhite.forEach(el => {
    el.classList.add("fillWhite");
  });
}