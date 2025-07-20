const btn = document.getElementById('btnTop');

btn.addEventListener("click", function () {
    window.scrollTo(0, 0)
})

function ocultar() {
    if (window.scrollY < 10) {
        btn.style.visibility = "hidden";
        btn.style.opacity = "0";
    } else {
        btn.style.visibility = "visible";
        btn.style.opacity = "1";
    }
}

setTimeout(() => {
  window.addEventListener("scroll", ocultar)
}, "500");
