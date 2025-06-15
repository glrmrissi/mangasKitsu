import { getImageProfile } from "../../../src/pages/profile/process/process.js";

const baseURL = location.hostname === "127.0.0.1" || location.hostname === "localhost" ? "/" : "../../../";

class Header extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = `
        <link rel="stylesheet" href="${baseURL}src/styles/import.css">
          <header class="header_main">
                    <nav class="nav-main">
                    <div class="shrink">
                        <span class="hover_side_bar btn_shrink"><img class="fillWhite iconsSize" src="${baseURL}src/icon/list-ul.svg"
                                alt="Button of side bar" srcset="">
                        </span>
                    </div>
                    <nav class="navigation_desktop">
                        <ul class="nav-list-desktop">
                            <a href="${baseURL}index.html" target="_self"><img src="${baseURL}src/icon/logo.png" class="logo"
                                        srcset=""></a>
                            <li class="nav-link-desktop"><a class="hover-effect-nav" href="${baseURL}index.html">
                                    <span>Home</span></a></li>
                            <li class="nav-link-desktop"><a class="hover-effect-nav" href="${baseURL}src/pages/categories/categories.html"><span>Categories</span></a></li>
                            <li class="nav-link-desktop"><a class="hover-effect-nav" href="${baseURL}src/pages/mangas/mangas.html"><span>Mangas</span></a></li>
                            <li class="nav-link-desktop"><a class="hover-effect-nav" href="${baseURL}src/pages/trending/trending.html"
                                    target="_self"><span>Trending</span></a>
                            </li>
                            <li class="nav-link-desktop"><a class="hover-effect-nav" href="${baseURL}src/pages/about/about.html"
                                    target="_self"><span>About</span></a>
                            </li>
                        </ul>
                    </nav>
                    <div>
                        <img style="width: 3dvh; padding: 0.3dvh; cursor: pointer;" class="fillWhite" id="toggle_theme"
                            src="${baseURL}src/icon/cloud-moon-fill.svg" alt="">
                    </div>
                    <div class="div-input-search-main">
                        <input class="mangaInput" type="text" id="mangasName" name="input_search" placeholder="" required />
                        <label for="input_search">Name: </label>
                    </div>
                    <div class="profile-icon">
                        <a href="${baseURL}src/pages/profile/profile.html" target="_self"><img id="profilePhotoGlobal" class="iconsSize"
                                src="${baseURL}src/icon/profile.svg" alt="Profile Icon"></a>
                    </div>
                </nav>
            </header>
            <aside class="side-bar" id="side_bar">
        <div class="side-bar-overlay" id="sideBarOverlay"></div>
        <nav class="navigation">
            <div class="shrink">
                <a href="${baseURL}index.html" target="_self"><span class=""><img src="${baseURL}src/icon/logo.png" class="logo"
                            srcset=""></span></a>
                <span class="hover_side_bar btn_shrink"><img class="fillWhite iconsSize" src="${baseURL}src/icon/arrow-left.svg"
                        alt="" srcset=""></span>
            </div>
            <ul class="nav-list" id="header_nav">
                <li class="nav-link"><a class="hover-effect-nav" href="${baseURL}index.html">
                        <img class="fillWhite iconsSize" src="${baseURL}src/icon/house.svg" alt="">
                        <span>Home</span></a></li>
                <li class="nav-link"><a class="hover-effect-nav" href="${baseURL}src/pages/categories/categories.html"><img
                            class="fillWhite iconsSize" src="${baseURL}src/icon/bar-chart-steps.svg"
                            alt=""><span>Categories</span></a></li>
                <li class="nav-link"><a class="hover-effect-nav" href="${baseURL}src/pages/mangas/mangas.html"><img
                            class="fillWhite iconsSize" src="${baseURL}src/icon/book.svg" alt=""><span>Mangas</span></a></li>
                <li class="nav-link"><a class="hover-effect-nav" href="src/pages/trending/trending.html"
                        target="_self"><img class="fillWhite iconsSize" src="${baseURL}src/icon/bar-chart.svg"
                            alt=""><span>Trending</span></a>
                </li>
                <li class="nav-link"><a class="hover-effect-nav" href="${baseURL}src/pages/about/about.html" target="_self"><img
                            class="fillWhite iconsSize" src="${baseURL}src/icon/question-circle.svg" alt=""><span>About</span></a>
                </li>
            </ul>
        </nav>
    </aside>
      `;

        this.theme();
        this.search();
        this.sideBar();
    }

    connectedCallback() {
        const profilePhotoGlobal = this.shadowRoot.querySelector("#profilePhotoGlobal");
        window.addEventListener("load", async function () {
            profilePhotoGlobal.setAttribute("src", await getImageProfile());
        });
    }

    theme() {
        const body = document.body;

        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            body.setAttribute("data-theme", savedTheme);
        }

        const paths = {
            sun: [
                `${baseURL}src/icon/cloud-sun-fill.svg`,
            ],
            moon: [
                 `${baseURL}src/icon/cloud-moon-fill.svg`,
            ]
        }
        const toggleTheme = this.shadowRoot.querySelector("#toggle_theme");

        toggleTheme.addEventListener("click", () => {
            const currentTheme = body.getAttribute("data-theme");
            const newTheme = currentTheme === "light" ? "dark" : "light";

            const themeType = newTheme === "light" ? "sun" : "moon";

            setValidImage(toggleTheme, themeType);

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

        setValidImage(toggleTheme, themeType);
    }

    search() {
        const mangasName = this.shadowRoot.getElementById('mangasName')
        mangasName.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                const mangaName = mangasName.value;
                const searchUrl = `../../../src/pages/search/search.html?name=${encodeURIComponent(mangaName)}`
                window.open(searchUrl, '_blank');
            }
        });
    }

    sideBar() {
        const btnShrink = this.shadowRoot.querySelectorAll(".btn_shrink")
        const overlayShrink = this.shadowRoot.querySelector(".side-bar-overlay")
        const header = this.shadowRoot.getElementById("side_bar");

        btnShrink.forEach((btn) => {
            btn.addEventListener("click", () => {
                const sideBarOverlay = this.shadowRoot.getElementById("sideBarOverlay");
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
        function loadShrinkOverlay() {
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

        loadShrinkOverlay();
    }
}

customElements.define('header-component', Header);