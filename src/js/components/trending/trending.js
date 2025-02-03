// Por enquanto está página é um teste!

const fetchMangasSliders = async () => {
    fetch('https://kitsu.io/api/edge/trending/manga?page[limit]=18&page[offset]=18')
        .then(response => response.json())
        .then(data => {

            const sliderContainer = document.getElementById('slider_container')
            const trendSlider = document.createElement('div');


            trendSlider.innerHTML = `
        <aside class="limited-overflow">
        <div class="title">
            <h1 class="hover-effect">Trending</h1>
        </div>
            <section id="my" class="slider">
                <article class="slider-car first">
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

                imgElementSlider.src = posterImage.large
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
