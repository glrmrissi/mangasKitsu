let nextPageUrl = null;
let offsetCustom = 18;

export async function fetchManga(name, isLoadMore = false) {
    const url = isLoadMore
        ? `https://kitsu.io/api/edge/manga?filter[text]=${name}&page[limit]=18&page[offset]=${offsetCustom}`
        : `https://kitsu.io/api/edge/manga?filter[text]=${name}&page[limit]=18&page[offset]=10`;


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
            const { canonicalTitle, synopsis, posterImage, ageRating, startDate } = manga.attributes
            const div = document.createElement("div");
            const divTooltip = document.createElement("section");
            const spanTooltip = document.createElement("span");
            const asideDetails = document.createElement("aside")
            const h3 = document.createElement("h3")
            const p = document.createElement("p");
            const img = document.createElement("img");
            const articleMobile = document.createElement("article");
            const h3Mobile = document.createElement("h3");

            div.classList.add("card-front");
            divTooltip.classList.add("tooltip");
            spanTooltip.classList.add("tooltiptext");
            asideDetails.classList.add("details-tooltip");
            articleMobile.classList.add("article-mobile");

            img.src = posterImage.small;
            h3.textContent = `${canonicalTitle} - ${startDate}`;
            p.innerHTML = `&nbsp; ${synopsis}`;
            h3Mobile.textContent = `${canonicalTitle} - ${startDate}`;
            div.appendChild(divTooltip);
            div.appendChild(articleMobile);
            articleMobile.appendChild(h3Mobile)
            divTooltip.appendChild(spanTooltip);
            divTooltip.appendChild(img);
            spanTooltip.appendChild(asideDetails);
            asideDetails.appendChild(h3);
            asideDetails.appendChild(p);


            div.addEventListener('click', () => {
                console.log(manga.id)
                localStorage.setItem('selectedAnimeId', manga.id)

                window.open('../../../src/pages/details/details-manga.html', '_blank')
            })
            document.getElementById('mangasList').appendChild(div);
        });
        offsetCustom += 18;
        nextPageUrl = `https://kitsu.io/api/edge/manga?filter[text]=${name}&page[limit]=18&page[offset]=${offsetCustom}`;
        hideLoading();

    } catch (error) {
        console.error('Erro ao buscar mangas:', error);
        hideLoading();
    }
}

export { nextPageUrl };