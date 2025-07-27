import { loadPage } from "../../services/api/loadPage.js";

let visiblePages = 8
let totalPages = 1;
let currentPage = 1;
let pageSize = 18;
const paginationContainer = document.getElementById("pagination");

export async function fetchMangas(page) {
    const offset = (page - 1) * pageSize;
    showLoading()

    document.body.classList.add('loadingCursor');
    try {
        const response = await fetch(`https://kitsu.io/api/edge/manga?page[limit]=${pageSize}&page[offset]=${offset}&sort=-createdAt`);
        const data = await response.json();

        if (data.meta && data.meta.count) {
            const totalItems = data.meta.count;
            totalPages = Math.ceil(totalItems / pageSize);
        } else {
            console.error("Erro: meta.count não encontrado na resposta da API.");
        }

        hideLoading();
        const safeMangas = data.data.filter((manga) => manga.attributes.ageRating !== 'R18');

        return safeMangas;
    } catch (error) {
        console.error("Erro ao carregar mangás:", error);
        return [];
    } finally {
        document.body.classList.remove('loadingCursor');
    }
}

export async function renderPagination() {
    paginationContainer.innerHTML = "";
    const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    const endPage = Math.min(totalPages, startPage + visiblePages);

    function firstLastBtn(btn, currentButton) {
        btn.addEventListener("click", () => {
            currentPage = currentButton;
            loadPage(currentPage);
        });
    }

    const firstButton = document.createElement("button");
    firstButton.textContent = "L";
    paginationContainer.appendChild(firstButton);
    firstLastBtn(firstButton, startPage);


    // load btns between first and last btns.
    for (let i = startPage; i <= endPage; i++) {
        const button = document.createElement("button");
        button.innerText = i;

        if (i === currentPage) {
            button.classList.add("active");
        }

        button.addEventListener("click", () => {
            window.scrollTo(0, 1300);
            currentPage = i;
            loadPage(currentPage);
            document.querySelectorAll('.grid').forEach((grid) => {
                grid.classList.remove('loadingGrid');
            });
            document.querySelectorAll(".pagination button").forEach((btn) => {
                btn.classList.remove("active");
            });
            button.classList.add("active");
        });
        paginationContainer.appendChild(button);
    }

    const lastButton = document.createElement("button");
    lastButton.textContent = "R";
    paginationContainer.appendChild(lastButton);
    firstLastBtn(lastButton, endPage);
}

loadPage(currentPage);