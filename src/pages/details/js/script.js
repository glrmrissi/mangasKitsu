async function fetchMangaDetails(id) {
  const response = await fetch(`https://kitsu.io/api/edge/manga/${id}`);
  const data = await response.json();
  return data.data;
}

async function displayMangaDetails() {
  const mangaId = localStorage.getItem('selectedAnimeId');
  if (!mangaId) {
    document.body.innerHTML = '<p>Erro: Nenhum mangá selecionado.</p>';
    return;
  }

  
  const manga = await fetchMangaDetails(mangaId);
  const mangaDetails = document.getElementById('manga-details');
  const {coverImage, posterImage, titles, canonicalTitle, status, averageRating, volumeCount, synopsis, userCount, mangaCharacters } = manga.attributes
  const statusUpperCase = status.charAt(0).toUpperCase() + status.slice(1);
  document.title = `Details ${titles.en || titles.jp || canonicalTitle || titles.en_jp || "Don't have title"} - Rissi`;
  
  mangaDetails.innerHTML = `
    <div class="banner_manga">
      <img src="${coverImage?.original || posterImage.original || posterImage.large || posterImage.small}" />
      </div>
      <section class="grid-manga-details">
        <aside class="left-side d-center">
          <div>
            <h2>${titles.en || titles.en_jp || canonicalTitle || titles.ja_jp || "Content not found"}</h2>
            <img class="img-details" src="${posterImage.large}" alt="${titles.en || titles.en_jp || titles.ja_jp}" />
            <div class="infos-details">
              <p><strong>Status:</strong>&nbsp; ${statusUpperCase || "Content not found"}</p>
              <p><strong>Views:</strong>&nbsp; ${userCount || "Content not found"}</p>
              <p><strong>Rating:</strong>&nbsp; ${averageRating || "Content not found"}</p>
              <p><strong>Chapters:</strong>&nbsp; ${volumeCount || "Content not found"}</p>
            </div>
          </div>
          </aside>
          <aside class="right-side d-center">
          <div class="title-synopsis">
            <h2>Synopsis:</h2>
          </div>
          <div class="paragrafer-synopsis">
            <p>&nbsp; &nbsp;${synopsis || "Content not found"}</p>
          </div>
          </aside>
      </section>
            `;
}

displayMangaDetails();
