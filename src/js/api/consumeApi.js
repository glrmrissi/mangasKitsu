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

                const overlayImg = document.createElement("span");
                const imgElementSlider = document.createElement("img");
                overlayImg.className = "overlay"

                let countOverlay = 0;

                for (var i = 0; i < sliderItems.length; i++) {
                    countOverlay++;
                }
                overlayImg.textContent = countOverlay;
                imgElementSlider.src = manga.attributes.posterImage.large
                divSliderCard.appendChild(overlayImg)
                divSliderCard.appendChild(imgElementSlider)

                divSliderCard.addEventListener('click', () => {
                    console.log("Setedetdawfaw")
                    localStorage.setItem('selectedAnimeId', manga.id)
        
                    window.open('src/pages/details/details-manga.html', '_blank')
                })
            });
        })
        .catch(error => {
            console.error(error)
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
        img.src = manga.attributes.posterImage.small;
        img.alt = manga.attributes.canonicalTitle;
        
        const imgOverlay = document.createElement("img");
        imgOverlay.classList.add("img-overlay")
        
        const overlay = document.createElement("span");
        overlay.classList.add("overlay");

        const textOverlay = document.createElement("span");
        textOverlay.classList.add("text-overlay");


        imgOverlay.src = "src/icon/book.svg"

        overlay.appendChild(textOverlay);
        textOverlay.appendChild(imgOverlay);
        mangaItem.appendChild(overlay);
        mangaItem.appendChild(img);

        mangaContainer.appendChild(mangaItem);
        mangaItem.addEventListener('click', () => {
            console.log("Setedetdawfaw", manga.id)
            localStorage.setItem('selectedAnimeId', manga.id)

            window.open('src/pages/details/details-manga.html', '_blank')
        })
        hideLoading()
    });
}

export async function loadPage(page) {
    const mangas = await fetchMangas(page);
    renderMangas(mangas);
    renderPagination()
}
