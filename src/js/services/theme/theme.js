const toggleTheme = document.getElementById("toggle_theme");

const body = document.body;

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  body.setAttribute("data-theme", savedTheme);
}

const fillWhite = document.querySelectorAll(".fillWhite");

const paths = {
  sun: [
    "src/icon/cloud-sun-fill.svg",
    "../../../src/icon/cloud-sun-fill.svg"
  ],
  moon: [
    "src/icon/cloud-moon-fill.svg",
    "../../../src/icon/cloud-moon-fill.svg"
  ]
}

toggleTheme.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";

  const themeType = newTheme === "light" ? "sun" : "moon";
  
  setValidImage(toggleTheme, themeType);

  if (newTheme === "light") {
    fillWhite.forEach(el => {
      el.classList.remove("fillWhite");
    });
  } else {
    fillWhite.forEach(el => {
      el.classList.add("fillWhite");
    });
  }

  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
});

function setValidImage(element, themeType) {
  const pathList = paths[themeType];

  for (let path of pathList) {
    const imgTest = new Image();
    imgTest.src = path;
    imgTest.onload = () => {
      element.src = path; 
    };
  }
}

const themeType = savedTheme === "light" ? "sun" : "moon";

if (savedTheme === "light") {
  fillWhite.forEach(el => {
    el.classList.remove("fillWhite");
  });
} else {
  fillWhite.forEach(el => {
    el.classList.add("fillWhite");
  });
}

setValidImage(toggleTheme, themeType);