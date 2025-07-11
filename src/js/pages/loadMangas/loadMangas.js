import { fetchApi } from "../../services/api/fetchApi.js";
import { getAnime } from "../../services/api/getAnimeId.js";


export default function loadSectionMangas(url) {
  const mainManga = document.querySelector("#mainManga")
  fetchApi(url)
    .then((data) => {
      let urlObj = new URL(url);

      urlObj = urlObj.searchParams.get("filter[categories]")
      const mangaDiv = document.createElement("section");
      const titleCategory = document.createElement("p");

      const categoriesTitleUrl = data.data[0].relationships.categories.links.related;

      mainManga.appendChild(titleCategory);

      const upperCaseTitleCategory = urlObj.charAt().toUpperCase() + urlObj.slice(1);
      titleCategory.textContent = upperCaseTitleCategory;


      data.data.forEach((manga) => {
        const { canonicalTitle, synopsis, posterImage, ageRating } = manga.attributes;

        const mangaItem = document.createElement("div");
        const title = document.createElement("p");
        const img = document.createElement("img");

        mangaDiv.classList.add("manga-div")
        mangaItem.classList.add("manga-item")
        title.classList.add("text-overlay")
        title.textContent = canonicalTitle;

        let contentNotFound = [
          "../../../src/imgs/cntf-1.jpg",
          "../../../src/imgs/cntf-2.jpg",
          "../../../src/imgs/cntf-3.jpg"
        ];

        img.src = posterImage.small || contentNotFound[Math.floor(Math.random() * contentNotFound.length)];
        img.title = canonicalTitle;

        mangaItem.appendChild(img);
        mangaItem.appendChild(title)
        mangaDiv.appendChild(mangaItem);
        mainManga.appendChild(mangaDiv);

        getAnime(mangaItem, manga.id);
      });
    })
    .catch((error) => {
      console.error(error);
    });
}
