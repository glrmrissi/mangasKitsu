import {
  renderPagination,
  fetchMangas,
} from "../../modules/pagination/pagination.js";
import { renderMangas } from "./getRecents.js";
import { fetchMangasSliders } from "./getTrending.js"

export async function loadPage(page) {
  const mangas = await fetchMangas(page); // Está em ../../modules/pagination/pagination.js
  renderMangas(mangas);
  renderPagination();
  fetchMangasSliders();
}
