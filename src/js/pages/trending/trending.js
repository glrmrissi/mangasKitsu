import { getAnime } from "../../../../src/js/services/api/getAnimeId.js"

const categoriesDiv = document.getElementById("categoriesMain");
const fetchMangasSliders = async () => {
    let kitsuUrl = "https://kitsu.io/api/edge/manga?page[limit]=18&page[offset]=18"
    console.log(kitsuUrl)
    fetch(kitsuUrl)
        .then(response => response.json())
        .then(data => {

            data.data.forEach(manga => {

                const { mangaType, canonicalTitle, synopsis, posterImage, ageRating, startDate, popularityRank, ratingRank } = manga.attributes;

                const mangaTypeUpperCase = mangaType.charAt(0).toUpperCase() + mangaType.slice(1);

                let date = startDate ? startDate.slice(0, 4) : "Date not found"

                let contentNotFound = [
                    "../../../src/imgs/cntf-1.jpg",
                    "../../../src/imgs/cntf-2.jpg",
                    "../../../src/imgs/cntf-3.jpg"
                ];

                const mangaItem = document.createElement("div");
                const divTooltip = document.createElement("div");
                const spanTooltip = document.createElement("span");
                const asideDetails = document.createElement("aside")
                const h3 = document.createElement("h3");
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

                img.src = posterImage.large || contentNotFound[Math.floor(Math.random() * contentNotFound.length)];
                img.alt = canonicalTitle;
                img.tabIndex = 0;
                h3.textContent = `${canonicalTitle} - ${date}`;
                popularityRankP.textContent = `🎉 #${popularityRank} Most popular ✨ #${ratingRank} Rated`
                pTypeManga.textContent = `Type: ${mangaTypeUpperCase}`;
                p.innerHTML = `&nbsp; ${synopsis}`;
                h3Mobile.textContent = `${canonicalTitle} - ${date}`;

                categoriesDiv.appendChild(mangaItem);
                mangaItem.appendChild(divTooltip);
                divTooltip.appendChild(spanTooltip);
                divTooltip.appendChild(img);
                mangaItem.appendChild(articleMobile);
                articleMobile.appendChild(h3Mobile)
                spanTooltip.appendChild(asideDetails);
                asideDetails.appendChild(h3);
                asideDetails.appendChild(relevantInfos)
                relevantInfos.appendChild(popularityRankP);
                relevantInfos.appendChild(pTypeManga);
                asideDetails.appendChild(p);
                getAnime(mangaItem, manga.id);
            });
        })
        .catch(error => {
            console.error(error)
        })
}

fetchMangasSliders()
