import { fetchManga, nextPageUrl } from '../search/search.js';

function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return params.get('name');
}

const query = getQueryParams();
if (query.trim() !== '') {
  document.title = `Searched ${query}`;
  fetchManga(query);
  console.log(query)
} else {
  document.title = `Nothing `;
  document.getElementById('mangasList').innerHTML = '<p>Nenhuma pesquisa realizada.</p>';
}


function loadMoremanga() {
  const loadMoreButton = document.getElementById("loadMoreButton");
  if (nextPageUrl) {
    loadMoreButton.style.display = "flex"
    console.log("loadmore", nextPageUrl)
    fetchManga(query, true);
  }
}
document.getElementById('loadMoreButton').addEventListener('click', loadMoremanga);
