import { fetchApi } from "./fetchApi.js";

export const fetchMangasSliders = async () => {
  const url = "https://kitsu.io/api/edge/trending/manga";
  fetchApi(url)
    .then((data) => {
      const sliderContainer = document.getElementById("slider_container");
      const trendSlider = document.createElement("div");

      // Nota: passar para textcontent
    //   //trendSlider.innerHTML = `
    //     <aside class="limited-overflow">
    //     <div class="title skeleton-load box">
    //         <h1 class="hover-effect">Most read:</h1>
    //     </div>
    //         <section id="my" class="slider">
    //             <article class="slider-car">
    //             </article>    
    //         </section>
    //     </aside>
    //         `;
      const aside = document.createElement("aside");
      const divTitle = document.createElement("div");
      const title = document.createElement("h1");
      const section = document.createElement("section");
      const article = document.createElement("article");

      aside.classList.add("limited-overflow");
      divTitle.classList.add("title");
      divTitle.classList.add("skeleton-load");
      divTitle.classList.add("box");
      title.classList.add("hover-effect");
      title.textContent = "Most read:"
      section.classList.add("slider");
      section.id = "my";
      article.classList.add("slider-car");

      divTitle.appendChild(title);
      section.appendChild(article);
      aside.appendChild(divTitle);
      aside.appendChild(section)
      trendSlider.appendChild(aside);
      sliderContainer.appendChild(trendSlider);
      const sliderCard = trendSlider.querySelector(".slider-car");

      data.data.forEach((manga) => {
        const { canonicalTitle, synopsis, posterImage, ageRating } =
          manga.attributes;

        const divSliderCard = document.createElement("div");

        divSliderCard.className = "imgs-slider";
        sliderCard.appendChild(divSliderCard);

        const sliderItems = Array.from(sliderCard.children);

        const overlayImg = document.createElement("span");
        const imgElementSlider = document.createElement("img");
        overlayImg.className = "overlay";

        let countOverlay = 0;

        for (var i = 0; i < sliderItems.length; i++) {
          countOverlay++;
        }
        overlayImg.textContent = countOverlay;
        imgElementSlider.src = posterImage.large;
        imgElementSlider.title = canonicalTitle;
        imgElementSlider.alt = canonicalTitle;
        imgElementSlider.tabIndex = 0;
        imgElementSlider.classList.add("box");
        divSliderCard.appendChild(overlayImg);
        divSliderCard.appendChild(imgElementSlider);

        divSliderCard.addEventListener("click", () => {
          localStorage.setItem("selectedAnimeId", manga.id);

          window.open("src/pages/details/details-manga.html", "_blank");
        });

        const cardImgs = document.querySelectorAll(".imgs-slider img");
        cardImgs.forEach((cardImg) => {
          cardImg.onload = () => {
            document.querySelectorAll(".imgs-slider").forEach((imgsSlider) => {
              imgsSlider.classList.remove("loadingGrid");
              sliderContainer.classList.remove("skeleton-load");
            });
          };
        });
      });
    })
    .catch((error) => {
      console.error(error);
    });
};
