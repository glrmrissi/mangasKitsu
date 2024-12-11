import { renderPagination, fetchMangas } from "../components/pagination/pagination.js";

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
export async function renderMangas(mangas) { // Este está renderizando os mangás ok ok ok 
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

export async function loadPage(page) {
    const mangas = await fetchMangas(page);
    renderMangas(mangas);
    renderPagination()
}
