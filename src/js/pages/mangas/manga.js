import { fetchApi } from "../../services/api/fetchApi.js";
import { getAnime } from "../../services/api/getAnimeId.js";

let url;
export const fetchMangasPage = async () => {
  fetch("https://raw.githubusercontent.com/glrmrissi/mangasKitsuJson/refs/heads/main/links.json")
    .then(response => response.json())
    .then(data => {
      data.linksMangas.forEach((link) => {
        url = link;
        loadSectionsMangas(url);
      })
    });
};

function loadSectionsMangas(url) {
  const mainManga = document.querySelector("#mainManga")
  fetchApi(url)
    .then((data) => {
      const mangaDiv = document.createElement("section");
      const titleCategory = document.createElement("h2");

      const categoriesTitleUrl = data.data[0].relationships.categories.links.related;

      mainManga.appendChild(titleCategory);

      fetch(categoriesTitleUrl)
        .then(response => response.json())
        .then(data => {
          titleCategory.textContent = data.data[0].attributes.title;
          // console.log(`Categoria: ${data.data[0].attributes.title}`)
        })
        .catch(error => {
          console.error("Erro ao buscar categorias:", error);
        });


      data.data.forEach((manga) => {
        const { canonicalTitle, synopsis, posterImage, ageRating } = manga.attributes;

        const mangaItem = document.createElement("div");
        const title = document.createElement("h3");
        const img = document.createElement("img");

        mangaDiv.classList.add("manga-div")
        mangaItem.classList.add("manga-item")
        title.classList.add("text-overlay")
        title.textContent = canonicalTitle;

        img.src = posterImage.small;
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


fetchMangasPage();