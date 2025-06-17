const pathParts = location.pathname.split("/").filter(Boolean);
const firstFolder = pathParts.length > 0 ? pathParts : "";

const baseURL =  firstFolder[0] === "src" || firstFolder[1] === "src"
  ? `../../../`
  : "";

class Footer extends HTMLElement {
        constructor() {
                super();

                const shadow = this.attachShadow({ mode: 'open' })

                shadow.innerHTML = 
                `
                <link rel="stylesheet" href="${baseURL}src/styles/import.css">
                <footer id="footer">
                        <article class="footer_nav">
                        <nav>
                                <ul class="footer__list">
                                <li><a href="https://www.linkedin.com/in/guilherme-rissi-b90382337/" target="_blank">
                                        <img width="100%" src="https://glrmrissi.github.io/mangasKitsu/src/icon/linkedin.svg" alt="Linkedin">
                                </a></li>
                                <li><a href="https://github.com/glrmrissi" target="_blank">
                                        <img width="100%" src="https://glrmrissi.github.io/mangasKitsu/src/icon/github.svg" alt="GitHub">
                                </a></li>
                                </ul>
                        </nav>
                        </article>
                <article class="footer_logo">
                        <img src="https://glrmrissi.github.io/mangasKitsu/src/icon/logo.png" alt="">
                        <a>
                                © Copyright Guilherme Rissi - 2024
                        </a>
                </article>
                </footer>
                `
        }
}

customElements.define('footer-component', Footer);
























// async function loadFooter() {
//         for (let path of pathsFooter) {
//                 try {
//                         const response = await fetch(path);
//                         if (response.ok) {
//                                 const html = await response.text();
//                                 document.getElementById("footer").innerHTML = html;
//                                 break;
//                         }
//                 } catch (error) {
//                         console.error(`Erro ao carregar: ${path}`);
//                 }
//         }
// }

// loadFooter();