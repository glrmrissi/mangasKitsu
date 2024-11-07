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
                <input type="radio" name="radio-btn" id="radio1">
                <input type="radio" name="radio-btn" id="radio2">
                <input type="radio" name="radio-btn" id="radio3">
                <input type="radio" name="radio-btn" id="radio4">
                <input type="radio" name="radio-btn" id="radio5">
                <input type="radio" name="radio-btn" id="radio6">
                <article class="slider-car first">
                    <!-- Essa bosta carrega as imagens do slider -->
                </article>
        
                <div class="auto_pass">
                    <div class="auto_btn auto_btn1"></div>
                    <div class="auto_btn auto_btn2"></div>
                    <div class="auto_btn auto_btn3"></div>
                    <div class="auto_btn auto_btn4"></div>
                </div>
                <div class="manual_pass">
                    <label for="radio1" class="manual_btn manual_btn_1"></label>
                    <label for="radio2" class="manual_btn manual_btn_2"></label>
                    <label for="radio3" class="manual_btn manual_btn_3"></label>
                    <label for="radio4" class="manual_btn manual_btn_4"></label>
                    <label for="radio5" class="manual_btn manual_btn_5"></label>
                    <label for="radio6" class="manual_btn manual_btn_6"></label>
                    <label for="radio7" class="manual_btn manual_btn_7"></label>
                    <label for="radio8" class="manual_btn manual_btn_8"></label>
                </div>
            
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

            const imgElementSlider = document.createElement("img");
            imgElementSlider.src = manga.attributes.posterImage.medium

            divSliderCard.appendChild(imgElementSlider)
        });
    })
    .catch(error => {
        console.error(error, "%cERROR", "color: red")
    })
}

fetchMangasSliders()