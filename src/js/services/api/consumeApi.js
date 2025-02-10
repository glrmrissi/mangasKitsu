/* Deveria estar consumindo somente a Api, porém sou burro e fiz tudo junto*/
import { renderPagination, fetchMangas } from "../../modules/pagination/pagination.js";


const fetchMangasSliders = async () => {
    fetch('https://kitsu.io/api/edge/trending/manga')
        .then(response => response.json())
        .then(data => {

            const sliderContainer = document.getElementById('slider_container')
            const trendSlider = document.createElement('div');

            // Nota: passar para textcontent
            trendSlider.innerHTML = `
        <aside class="limited-overflow">
        <div class="title skeleton-load box">
            <h1 class="hover-effect">Most read:</h1>
        </div>
            <section id="my" class="slider">
                <article class="slider-car">
                </article>    
            </section>
        </aside>
            `
            sliderContainer.appendChild(trendSlider);
            const sliderCard = trendSlider.querySelector(".slider-car")

            data.data.forEach(manga => {

                const { canonicalTitle, synopsis, posterImage, ageRating } = manga.attributes

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
                imgElementSlider.src = posterImage.large
                imgElementSlider.classList.add("box")
                divSliderCard.appendChild(overlayImg)
                divSliderCard.appendChild(imgElementSlider)

                divSliderCard.addEventListener('click', () => {
                    localStorage.setItem('selectedAnimeId', manga.id)

                    window.open('src/pages/details/details-manga.html', '_blank')
                })

                const cardImgs = document.querySelectorAll('.imgs-slider img')
                cardImgs.forEach((cardImg) => {
                    cardImg.onload = () => {
                        document.querySelectorAll('.imgs-slider').forEach((imgsSlider) => {
                            imgsSlider.classList.remove('loadingGrid');
                            sliderContainer.classList.remove("skeleton-load");
                        });
                    };
                });
            });
        })
        .catch(error => {
            console.error(error)
        })
}

fetchMangasSliders()

const mangaContainer = document.getElementById("manga-container");
export async function renderMangas(mangas) {
    mangaContainer.innerHTML = "";

    mangas.forEach((manga) => {

        const { canonicalTitle, synopsis, posterImage, averageRating } = manga.attributes

        const mangaItem = document.createElement("div");
        mangaItem.classList.add("loadingGrid");
        mangaItem.classList.add("box");
        mangaItem.classList.add("grid");

        const img = document.createElement("img");
        img.src = posterImage.small;
        img.alt = canonicalTitle;

        const overlay = document.createElement("span");
        overlay.classList.add("overlay");

        const textOverlay = document.createElement("span");
        const ageRatingOverlay = document.createElement("span");

        textOverlay.classList.add("text-overlay")
        ageRatingOverlay.classList.add("text-overlay")
        ageRatingOverlay.textContent = `${averageRating}`
        textOverlay.textContent = `${canonicalTitle}`

        ageRatingOverlay.appendChild(textOverlay);
        overlay.appendChild(textOverlay);
        mangaItem.appendChild(overlay);
        mangaItem.appendChild(img);

        mangaContainer.appendChild(mangaItem);

        const cardImgs = document.querySelectorAll('.grid img')
        cardImgs.forEach((cardImg) => {
            cardImg.onload = () => {
                document.querySelectorAll('.grid').forEach((grid) => {
                    grid.classList.remove('loadingGrid');
                    mangaContainer.classList.remove("skeleton-load");
                });
            };
        });


        mangaItem.addEventListener('click', () => {
            console.log(manga.id)
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