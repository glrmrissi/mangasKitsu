import { getAnime } from "./getAnimeId.js";

const mangaContainer = document.getElementById("manga-container");

const pathParts = location.pathname.split("/").filter(Boolean);
const firstFolder = pathParts.length > 0 ? pathParts : "";

const baseURL = firstFolder[0] === "src" || firstFolder[1] === "src"
  ? `../../../`
  : "";
  
export async function renderMangas(mangas) {
  // o parametro mangas esta sendo carregado juntamente com o pagination.js em loadPage, tem uma const com await lá...
  mangaContainer.innerHTML = "";

  mangas.forEach((manga) => {
    const { canonicalTitle, synopsis, posterImage, averageRating, coverImage } =
      manga.attributes;

    const contentNotFound = `${baseURL}src/imgs/cntf-1.png`;
    const img = document.createElement("img");
    const mangaItem = document.createElement("div");

    mangaItem.classList.add("loadingGrid");
    mangaItem.classList.add("box");
    mangaItem.classList.add("grid");
    mangaItem.tabIndex = 0;

    img.title = canonicalTitle;
    img.alt = canonicalTitle;

    const textOverlay = document.createElement("span");

    img.src = posterImage?.large || posterImage?.medium || posterImage?.small || contentNotFound;
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
