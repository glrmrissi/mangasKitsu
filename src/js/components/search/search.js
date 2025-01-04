let nextPageUrl = null;

export async function fetchManga(name, isLoadMore = false) {
    const url = isLoadMore && nextPageUrl ? nextPageUrl : `https://kitsu.io/api/edge/manga?filter[text]=${name}`;
    
    showLoading();

    try {
        const response = await fetch(url, {
            headers: {
                "Accept": "application/vnd.api+json",
                "Content-Type": "application/vnd.api+json",
            }
        });

        const data = await response.json();

        if (!isLoadMore) {
            document.getElementById('mangasList').innerHTML = '';
        }

        data.data.forEach(manga => {
            const mangaItem = document.createElement('section');
            mangaItem.className = 'manga-item'
             mangaItem.innerHTML = `
                <div class="manga-display">
                <div class="manga-container"> 
                    <div class="card-front">
                        <h4>${manga.attributes.canonicalTitle}</h4>
                        <img class="img-manga-container" id="openInfosmangas" src="${manga.attributes.posterImage.small}" alt="${manga.attributes.canonicalTitle}">
                    </div>
                    <div class="desc-overlay">
                            <div class="desc-paragraph">
                                <p>&nbsp; ${manga.attributes.synopsis}</p>
                                <h3>Age: &nbsp;${manga.attributes.ageRating}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.getElementById('mangasList').appendChild(mangaItem);
        });

        nextPageUrl = data.links.next;   
        hideLoading();

    } catch (error) {
        console.error('Erro ao buscar mangas:', error);
        hideLoading();
    }
}

export { nextPageUrl };