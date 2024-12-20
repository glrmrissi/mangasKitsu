let nextPageUrl = null;

async function fetchManga(name, isLoadMore = false) {
    const url = isLoadMore && nextPageUrl ? nextPageUrl : `https://kitsu.io/api/edge/manga?filter[text]=${name}`;
    
    showLoading(); // SHOW

    try {
        const response = await fetch(url, {
            headers: {
                "Accept": "application/vnd.api+json",
                "Content-Type": "application/vnd.api+json",
            }
        });

        const data = await response.json();

        if (!isLoadMore) {
            document.getElementById('mangasList').innerHTML = '';  // Limpa os resultados anteriores só se não for uma carga adicional
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
                            <span class="close-synopsis"><img src="assets/img/close.svg" /></span>
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

        nextPageUrl = data.links.next;  // Guarda a URL da próxima página
        hideLoading(); // HIDE

    } catch (error) {
        console.error('Erro ao buscar mangas:', error);
        hideLoading(); // Caso algum um erro ele esconder o loading
    }
}

document.getElementById('mangasName').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        const mangaName = document.getElementById('mangasName').value;
        const loadMoreButton = document.getElementById("loadMoreButton");
        loadMoreButton.style.display = "flex"
        nextPageUrl = null; // Reinicia o controle de páginas ao começar uma nova busca
        fetchManga(mangaName);
    }
});

// Função para carregar mais títulos
function loadMoremanga() {
    const mangasName = document.getElementById('mangasName').value;
    if (nextPageUrl) {
        fetchManga(mangasName, true);  // Busca mais títulos sem remover os já exibidos
    }
}

document.getElementById('loadMoreButton').addEventListener('click', loadMoremanga);