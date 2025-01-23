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

    document.title = `Details ${manga.attributes.titles.en || manga.attributes.titles.jp || manga.attributes.canonicalTitle || manga.attributes.titles.en_jp || "Don't have title"} - Rissi`;

    mangaDetails.innerHTML = `
    <div class="banner_manga">
      <img src="${manga.attributes.coverImage?.original || manga.attributes.posterImage.original || manga.attributes.posterImage.large || manga.attributes.posterImage.small}" />
      </div>
      <section class="grid-manga-details">
        <aside class="left-side d-center">
          <h2>${manga.attributes.titles.en || manga.attributes.titles.en_jp || manga.attributes.canonicalTitle || manga.attributes.titles.ja_jp || "Content not found"}</h2>
          <img class="img-details" src="${manga.attributes.posterImage.large}" alt="${manga.attributes.titles.en || manga.attributes.titles.en_jp || manga.attributes.titles.ja_jp}" />
          <p><strong>Status:</strong>&nbsp; ${manga.attributes.status}</p>
          <p><strong>Rating:</strong>&nbsp; ${manga.attributes.averageRating}</p>
          <p><strong>Chapters:</strong>&nbsp; ${manga.attributes.volumeCount}</p>
          </aside>
          <aside class="right-side d-center">
            <p>&nbsp; &nbsp;${manga.attributes.synopsis || "Content not found"}</p>
            </aside>
            </section>
            `;
  }

  displayMangaDetails();
