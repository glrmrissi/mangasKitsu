const fetchMangasSliders = async () => {
    fetch('https://kitsu.io/api/edge/trending/manga')
        .then(response => response.json())
        .then(data => {
            const sliderContainer = document.getElementById('slider_container')
            const trendSlider = document.createElement('div');

            // Mó preguiça de passar isso pra textcontent, dps faço kkk
            trendSlider.innerHTML = `
        <aside class="limited-overflow">
        <div class="title">
            <h1 class="hover-effect">Most read:</h1>
        </div>
            <section id="my" class="slider">
                <article class="slider-car first">
                    <!-- Essa bosta carrega as imagens do slider -->
                </article>    
            </section>
        </aside>
            `
            sliderContainer.appendChild(trendSlider);
            const sliderCard = trendSlider.querySelector(".slider-car")

            // Carrega as imagens dos mangas mais lidos, tenho que deixa isso mais legível
            data.data.forEach(manga => {
                const divSliderCard = document.createElement("div")

                divSliderCard.className = "imgs-slider"
                sliderCard.appendChild(divSliderCard)

                const sliderItems = Array.from(sliderCard.children);

                const imgElementSlider = document.createElement("img");
                const overlayImg = document.createElement("span");
                overlayImg.className = "overlay"

                let countOverlay = 0;

                for (var i = 0; i < sliderItems.length; i++) {
                    countOverlay++;
                }
                overlayImg.textContent = countOverlay;
                imgElementSlider.src = manga.attributes.posterImage.large
                divSliderCard.appendChild(overlayImg)
                divSliderCard.appendChild(imgElementSlider)
            });
        })
        .catch(error => {
            console.error(error, "%cERROR", "color: red")
        })
}

fetchMangasSliders()

const mangaContainer = document.getElementById("manga-container");
const paginationContainer = document.getElementById("pagination");
const pageSize = 20; // 4x4 grid
let currentPage = 1;
let totalPages = 1; // Define o total de páginas, agora está dinâmico
let visiblePages = 10
async function fetchMangas(page) { // Paginação
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
        hideLoading()
    } catch (error) {
        console.error("Erro ao carregar mangás:", error);
        return [];
    } finally {
        document.body.classList.remove('loadingCursor');
    }
}

function renderMangas(mangas) { // Este está renderizando os mangás ok ok ok 
    mangaContainer.innerHTML = "";

    mangas.forEach((manga) => {
        const mangaItem = document.createElement("div");
        mangaItem.classList.add("grid");

        const img = document.createElement("img");
        img.src = manga.attributes.posterImage.medium;
        img.alt = manga.attributes.canonicalTitle;

        const overlay = document.createElement("span");
        overlay.classList.add("overlay");

        const textOverlay = document.createElement("span");
        textOverlay.classList.add("text-overlay");

        const title = document.createElement("h4");

        const synopsis = document.createElement("p")

        title.textContent = manga.attributes.canonicalTitle;
        synopsis.textContent = manga.attributes.synopsis;

        textOverlay.appendChild(title);
        textOverlay.appendChild(synopsis)
        overlay.appendChild(textOverlay);
        mangaItem.appendChild(img);
        mangaItem.appendChild(overlay);

        mangaContainer.appendChild(mangaItem);
        hideLoading()
    });
}
function renderPagination() {
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

async function loadPage(page) {
    const mangas = await fetchMangas(page);
    renderMangas(mangas);
    renderPagination();
}

loadPage(currentPage);