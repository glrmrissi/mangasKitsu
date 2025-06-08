import {
  renderPagination,
  fetchMangas,
} from "../../modules/pagination/pagination.js";
import { renderMangas } from "./getRecents.js";
import { fetchMangasSliders } from "./getTrending.js"

fetchMangasSliders();

export async function loadPage(page) {
  const mangas = await fetchMangas(page); // Está em ../../modules/pagination/pagination.js
  renderMangas(mangas);
  renderPagination();
}


// fetch('http://localhost:3000/anime/2')
//   .then(res => res.text())
//   .then(xmlStr => {
//     const parser = new DOMParser();
//     const xml = parser.parseFromString(xmlStr, 'application/xml');
//     const title = xml.querySelector('anime > info[name="title"]').textContent;
//     console.log('Título:', title);
//   });