const btnShrink = document.querySelectorAll(".btn_shrink")
const overlayShrink = document.querySelector(".side-bar-overlay")
const header = document.getElementById("side_bar");

btnShrink.forEach((btn) => {
    btn.addEventListener("click", () => {
        const sideBarOverlay = document.getElementById("sideBarOverlay");
        if (header.classList.contains("resize_shrink_side_bar")) {
            sideBarOverlay.style.display = "none";
            header.classList.remove("resize_shrink_side_bar");
            document.body.style.overflow = "auto";  
        } else {
            sideBarOverlay.style.display = "block";
            header.classList.add("resize_shrink_side_bar");
            document.body.style.overflow = "hidden";    
        }
    });
});
async function loadShrinkOverlay() {
    if (!overlayShrink || !header || !sideBarOverlay) {
        console.error("Elementos necessários não foram encontrados!");
        return;
    }

    overlayShrink.addEventListener("click", () => {
        if (header.classList.contains("resize_shrink_side_bar")) {
            sideBarOverlay.style.display = "none";
            header.classList.remove("resize_shrink_side_bar");
            document.body.style.overflow = "auto";  
        } else {
            sideBarOverlay.style.display = "block";
            header.classList.add("resize_shrink_side_bar");
            document.body.style.overflow = "hidden";    
        }
    })
}

await loadShrinkOverlay();