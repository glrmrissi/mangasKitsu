let nextPageUrl = null;
let offsetCustom = 10;

export async function fetchManga(name, isLoadMore = false) {
    const url = isLoadMore 
    ? `https://kitsu.io/api/edge/manga?filter[text]=${name}&page[limit]=10&page[offset]=${offsetCustom}` 
    : `https://kitsu.io/api/edge/manga?filter[text]=${name}&page[limit]=10&page[offset]=10`;


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
            const { canonicalTitle, synopsis, posterImage, ageRating } = manga.attributes
            mangaItem.innerHTML = `
                <div class="manga-display">
                <div class="manga-container"> 
                    <div class="card-front">
                        <h4>${canonicalTitle}</h4>
                        <img class="img-manga-container" id="openInfosmangas" src="${posterImage.small}" alt="${canonicalTitle}">
                    </div>
                    <div class="desc-overlay">
                            <div class="desc-paragraph">
                                <p>&nbsp; ${synopsis}</p>
                                <h3>Age: &nbsp;${ageRating}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.getElementById('mangasList').appendChild(mangaItem);
        });
        offsetCustom += 10;
        nextPageUrl = `https://kitsu.io/api/edge/manga?filter[text]=${name}&page[limit]=10&page[offset]=${offsetCustom}`;
        hideLoading();

    } catch (error) {
        console.error('Erro ao buscar mangas:', error);
        hideLoading();
    }
}

export { nextPageUrl };