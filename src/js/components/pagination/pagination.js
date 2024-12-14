import { loadPage } from "../../api/consumeApi.js";

let visiblePages = 10
let totalPages = 1;
let currentPage = 1;
let pageSize = 20;
const paginationContainer = document.getElementById("pagination");
export async function fetchMangas(page) { // Paginação
    const offset = (page - 1) * pageSize;
    showLoading()

    document.body.classList.add('loadingCursor');
    try {
        const response = await fetch(`https://kitsu.io/api/edge/manga?page[limit]=${pageSize}&page[offset]=${offset}&sort=-createdAt`);
        const data = await response.json();

        if (data.meta && data.meta.count) {
            const totalItems = data.meta.count;
            totalPages = Math.ceil(totalItems / pageSize);
            console.log(`Total de itens: ${totalItems}, Total de páginas: ${totalPages}`);
        } else {
            console.error("Erro: meta.count não encontrado na resposta da API.");
        }

        return data.data;
        hideLoading();
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
    const endPage = Math.min(totalPages, startPage + visiblePages + 1);

    for (let i = startPage; i <= endPage; i++) {
        const button = document.createElement("button");
        button.innerText = i;

        if (i === currentPage) {
            button.classList.add("active");
        }

        button.addEventListener("click", () => {
            window.scrollTo(0, 600);
            currentPage = i;
            loadPage(currentPage);

            // Atualizar o botão ativo
            document.querySelectorAll(".pagination button").forEach((btn) => {
                btn.classList.remove("active");
            });
            button.classList.add("active");
        });

        paginationContainer.appendChild(button);
    }
}

loadPage(currentPage);