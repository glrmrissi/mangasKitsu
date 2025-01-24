document.addEventListener("mousemove", (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const viewportWidth = window.innerWidth;
    const halfViewport = viewportWidth * 0.5;
    const tooltip = document.querySelectorAll(".tooltiptext")

    tooltip.forEach(tooltiptext => {
        if (mouseX < halfViewport) {
            tooltiptext.classList.remove("right");
        } else {
            tooltiptext.classList.add("right");
        }
    })
});
