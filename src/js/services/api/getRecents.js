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

    const overlay = document.createElement("span");
    overlay.classList.add("overlay");
    overlay.alt = canonicalTitle;
    overlay.tabIndex = 0;
    overlay.title = canonicalTitle;

    const textOverlay = document.createElement("span");
    const ageRatingOverlay = document.createElement("span");

    textOverlay.classList.add("text-overlay");
    ageRatingOverlay.classList.add("text-overlay");
    ageRatingOverlay.textContent = `${averageRating}`;
    textOverlay.textContent = `${canonicalTitle}`;

    ageRatingOverlay.appendChild(textOverlay);
    overlay.appendChild(textOverlay);
    mangaItem.appendChild(overlay);
    mangaItem.appendChild(img);

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

    mangaItem.addEventListener("click", () => {
      localStorage.setItem("selectedAnimeId", manga.id);

      window.open("src/pages/details/details-manga.html", "_self");
    });

    hideLoading();
  });
}
