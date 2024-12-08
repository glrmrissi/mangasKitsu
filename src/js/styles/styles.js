
// function headerChangeObserver() {
//     const widthPage = window.innerWidth

//     if(widthPage < 768) {
//         console.log(widthPage)
//     }

//     console.log(widthPage)
// }

function adjustHeaderHeight() {
    const header = document.querySelector('.header');
    header.style.height = `${window.innerHeight}px`;
}

window.addEventListener('resize', adjustHeaderHeight);
adjustHeaderHeight();


const mediaQuery = window.matchMedia('(max-width: 1024px)');
const toggleMenuVisibility = (event) => {
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
