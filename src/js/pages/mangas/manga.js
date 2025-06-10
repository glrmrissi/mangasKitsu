import { fetchApi } from "../../services/api/fetchApi.js";
import { getAnime } from "../../services/api/getAnimeId.js";

export const fetchMangasPage = async () => {
  const url = "https://kitsu.io/api/edge/manga?page[limit]=10&filter[subtype]=manga&filter[categories]=action";
  const mainManga = document.querySelector("#mainManga")
  fetchApi(url)
    .then((data) => {
      const mangaDiv = document.createElement("section");
      const titleCategory = document.createElement("h2");

      titleCategory.textContent = "Action"

      mainManga.appendChild(titleCategory)
      data.data.forEach((manga) => {
        const { canonicalTitle, synopsis, posterImage, ageRating} =
          manga.attributes;

        const mangaItem = document.createElement("div");
        const title = document.createElement("h3");
        const img = document.createElement("img");

        mangaDiv.classList.add("manga-div")
        title.textContent = canonicalTitle;
        img.src = posterImage.small;
        img.title = canonicalTitle;

        mangaItem.appendChild(title)
        mangaItem.appendChild(img);
        mangaDiv.appendChild(mangaItem);
        mainManga.appendChild(mangaDiv);

        getAnime(mangaItem, manga.id);
      });
    })
    .catch((error) => {
      console.error(error);
    });
};


fetchMangasPage();