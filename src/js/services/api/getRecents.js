import { getAnime } from "./getAnimeId.js";

const mangaContainer = document.getElementById("manga-container");
export async function renderMangas(mangas) {
  // o parametro mangas esta sendo carregado juntamente com o pagination.js em loadPage, tem uma const com await lá...
  mangaContainer.innerHTML = "";

  mangas.forEach((manga) => {
    const { canonicalTitle, synopsis, posterImage, averageRating } =
      manga.attributes;

    const mangaItem = document.createElement("div");
    mangaItem.classList.add("loadingGrid");
    mangaItem.classList.add("box");
    mangaItem.classList.add("grid");

    const img = document.createElement("img");
    img.src = posterImage.small;
    img.title = canonicalTitle;
    img.alt = canonicalTitle;

    const textOverlay = document.createElement("span");

    textOverlay.classList.add("text-overlay");
    textOverlay.textContent = `${canonicalTitle}`;

    mangaItem.appendChild(img);
    mangaItem.appendChild(textOverlay);

    mangaContainer.appendChild(mangaItem);

    const cardImgs = document.querySelectorAll(".grid img");
    cardImgs.forEach((cardImg) => {
      cardImg.onload = () => {
        document.querySelectorAll(".grid").forEach((grid) => {
          grid.classList.remove("loadingGrid");
          mangaContainer.classList.remove("skeleton-load");
        });
      };
      
    });
    
    hideLoading();
    getAnime(mangaItem, manga.id);
  });
}
