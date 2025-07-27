import { fetchApi } from "./fetchApi.js";
import { getAnime } from "./getAnimeId.js";

const pathParts = location.pathname.split("/").filter(Boolean);
const firstFolder = pathParts.length > 0 ? pathParts : "";

const baseURL = firstFolder[0] === "src" || firstFolder[1] === "src"
  ? `../../../`
  : "";



export const fetchMangasSliders = async () => {
  const url = "https://kitsu.io/api/edge/trending/manga";
  showLoading();
  fetchApi(url)
    .then((data) => {
      const sliderContainer = document.getElementById("slider_container");
      const trendSlider = document.createElement("div");
      const aside = document.createElement("aside");
      const divTitle = document.createElement("div");
      const title = document.createElement("h1");
      const section = document.createElement("section");
      const article = document.createElement("article");

      aside.classList.add("limited-overflow");
      divTitle.classList.add("title");
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

        const mangaItem = document.createElement("div");

        mangaItem.className = "imgs-slider";
        mangaItem.classList.add("loadingGrid");

        sliderCard.appendChild(mangaItem);

        const sliderItems = Array.from(sliderCard.children);

        const overlayImg = document.createElement("span");
        const imgElementSlider = document.createElement("img");
        overlayImg.className = "overlay";

        let countOverlay = 0;

        for (var i = 0; i < sliderItems.length; i++) {
          countOverlay++;
        }

        const contentNotFound = `${baseURL}src/imgs/cntf-1.png`;
        overlayImg.textContent = countOverlay;
        imgElementSlider.src = posterImage?.large || posterImage?.medium || posterImage?.small || contentNotFound;
        imgElementSlider.title = canonicalTitle;
        imgElementSlider.alt = canonicalTitle;
        imgElementSlider.tabIndex = 0;
        imgElementSlider.classList.add("box");
        mangaItem.appendChild(overlayImg);
        mangaItem.appendChild(imgElementSlider);

        getAnime(mangaItem, manga.id)

        const cardImgs = document.querySelectorAll('.imgs-slider')
        cardImgs.forEach((cardImg) => {
              cardImg.classList.remove('loadingGrid');
        });

      });
      hideLoading();
    })
    .catch((error) => {
      console.error(error);
    });
}