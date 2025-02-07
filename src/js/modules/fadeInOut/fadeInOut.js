let observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }
    });
}, { threshold: 0.07 });

function observerNewBoxes() {
    document.querySelectorAll(".box").forEach(box => observer.observe(box));
}

let mutationObserver = new MutationObserver(observerNewBoxes);

let container = document.querySelector(".main-container"); 
mutationObserver.observe(container, { childList: true, subtree: true });

observerNewBoxes();