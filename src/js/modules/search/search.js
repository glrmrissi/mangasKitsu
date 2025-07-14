import { getAnime } from "../../../../src/js/services/api/getAnimeId.js"

let nextPageUrl = null;
let offsetCustom = 18;

export async function fetchManga(name, isLoadMore = false) {
    const url = isLoadMore
        ? `https://kitsu.io/api/edge/manga?filter[text]=${name}&page[limit]=18&page[offset]=${offsetCustom}`
        : `https://kitsu.io/api/edge/manga?filter[text]=${name}&page[limit]=18&page[offset]=18`;

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
            const { canonicalTitle, synopsis, posterImage, ageRating, startDate, popularityRank, ratingRank, mangaType} = manga.attributes
            const mangaTypeUpperCase = mangaType.charAt(0).toUpperCase() + mangaType.slice(1);

            const contentNotFound = "../../../src/imgs/cntf-1.png";

            const date = startDate.slice(0, 4);
            const mangaItem = document.createElement("div");
            const divTooltip = document.createElement("section");
            const spanTooltip = document.createElement("span");
            const asideDetails = document.createElement("aside")
            const h3 = document.createElement("h3")
            const relevantInfos = document.createElement("div");
            const p = document.createElement("p");
            const popularityRankP = document.createElement("p");
            const pTypeManga = document.createElement("p");
            const img = document.createElement("img");
            const articleMobile = document.createElement("article");
            const h3Mobile = document.createElement("h3");

            mangaItem.classList.add("card-front");
            divTooltip.classList.add("tooltip");
            spanTooltip.classList.add("tooltiptext");
            asideDetails.classList.add("details-tooltip");
            relevantInfos.classList.add("relevant-infos")
            articleMobile.classList.add("article-mobile");
            popularityRankP.classList.add("popularity-rank-p");
            img.classList.add("box");

            img.src = posterImage.large || posterImage.medium || posterImage.small || contentNotFound;
            h3.textContent = `${canonicalTitle} - ${date}`;
            popularityRankP .textContent = `🎉 #${popularityRank} Most popular ✨ #${ratingRank} Rated`
            pTypeManga.textContent = `Type: ${mangaTypeUpperCase}`;
            p.innerHTML = `&nbsp; ${synopsis}`;
            h3Mobile.textContent = `${canonicalTitle} - ${date}`;

            mangaItem.appendChild(divTooltip);
            mangaItem.appendChild(articleMobile);
            articleMobile.appendChild(h3Mobile)
            divTooltip.appendChild(spanTooltip);
            divTooltip.appendChild(img);
            spanTooltip.appendChild(asideDetails);
            asideDetails.appendChild(h3);
            asideDetails.appendChild(relevantInfos)
            relevantInfos.appendChild(popularityRankP);
            relevantInfos.appendChild(pTypeManga);
            asideDetails.appendChild(p);

            getAnime(mangaItem, manga.id);

            document.getElementById('mangasList').appendChild(mangaItem);
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