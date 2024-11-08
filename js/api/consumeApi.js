const fetchMangasSliders = async () => {
    fetch('https://kitsu.io/api/edge/trending/manga')
    .then(response => response.json())
    .then(data => {
        const sliderContainer = document.getElementById('slider_container')
        const trendSlider = document.createElement('div');

        trendSlider.innerHTML = `
        <aside class="limited-overflow">
        <div class="title">
            <h1 class="hover-effect">Mais lidos:</h1>
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
const pageSize = 16; // 4x4 grid
let currentPage = 1;
const totalPages = 20; // Define o total de páginas (pode ser dinâmico, porém, não sei como faz?!?!

async function fetchMangas(page) {
    const offset = (page - 1) * pageSize;
    try {
        const response = await fetch(`https://kitsu.io/api/edge/manga?page[limit]=${pageSize}&page[offset]=${offset}`);
        const data = await response.json();
        console.log(response)
        return data.data;
    } catch (error) {
        console.error("Erro ao carregar mangás:", error);
        return [];
    }
}

function renderMangas(mangas) {
    showLoading()
    mangaContainer.innerHTML = ""; // Limpa o container
    mangas.forEach((manga) => {
        const mangaItem = document.createElement("div");
        mangaItem.classList.add("grid");
        mangaItem.innerHTML = `
            <img src="${manga.attributes.posterImage.medium}" alt="${manga.attributes.canonicalTitle}">
        `;
        mangaContainer.appendChild(mangaItem);
        hideLoading()
    });
}

function renderPagination() {
    paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.innerText = i;

        if (i === currentPage) {
            button.classList.add("active");
        }

        button.addEventListener("click", () => {
            showLoading()
            window.scrollTo(0, 600)
            currentPage = i;
            loadPage(currentPage);
            document.querySelectorAll(".pagination button").forEach(btn => {
                btn.classList.remove("active");
                hideLoading()
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