const btnShrink = document.querySelectorAll(".btn_shrink")
btnShrink.forEach((btn) => {
    btn.addEventListener("click", () => {
        const sideBarOverlay = document.getElementById("sideBarOverlay");
        const header = document.getElementById("side_bar");
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

function adjustHeaderHeight() {
    const sideBar = document.querySelector('.side-bar');
    sideBar.style.height = `${window.innerHeight}px`;
};

window.addEventListener('resize', adjustHeaderHeight);
adjustHeaderHeight();


function styleParams() {
    const mediaQuery = window.matchMedia('(max-width: 1024px)');
    const toggleMenuVisibility = async (event) => {
        const mobileMenu = document.getElementById("header_mobile");
        const navMenu = document.getElementById("header_nav");

        if (event.matches) {
            navMenu.classList.add('hidden');
            mobileMenu.classList.remove('hidden');
        } else {
            navMenu.classList.remove('hidden');
            mobileMenu.classList.add('hidden');
        }
    };

    toggleMenuVisibility(mediaQuery);

    mediaQuery.addEventListener('change', toggleMenuVisibility);
}
document.addEventListener("DOMContentLoaded", () => {
    styleParams();
});

console.log("Carregado");