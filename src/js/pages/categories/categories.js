import { getAnime } from "../../../../src/js/services/api/getAnimeId.js"

const categorySelector = document.querySelector("#categoriesSelect");
const categoryTypes = document.querySelector("#categoriesTypes");
const defaultCategory = categorySelector.options[categorySelector.selectedIndex];
const defaultTypes = categoryTypes.options[categoryTypes.selectedIndex];

const categoriesDiv = document.getElementById("categoriesMain");
const target = document.querySelector("#listItem");
const categorySelected = document.querySelectorAll(".categoriesSelect");
const categoryType = document.querySelectorAll(".categoriesType");
const titleCategory = document.getElementById("titleCategory");
const submitFilter = document.querySelector("#submitFilter");

let offset = 18;
let limit = 18;
let url = defaultCategory.value;
let subTypeUrl = defaultTypes.value;
titleCategory.innerHTML = `${url}`;

setTimeout(() => {
    target.style.display = "flex";
}, 1000);

categorySelected.forEach(btns => {
    btns.addEventListener("click", () => {
        url = btns.value;
    })
})

categoryType.forEach(btns => {
    btns.addEventListener("click", () => {
        subTypeUrl = btns.value;
    })
})

showLoading();
const categories = async () => {
    let KitsuUrl = `https://kitsu.io/api/edge/manga?filter[categories]=${encodeURIComponent(url)}&filter[subtype]=${encodeURIComponent(subTypeUrl)}&page[limit]=${limit}&page[offset]=${offset}`
    console.log(KitsuUrl)
    console.log(url)
    fetch(KitsuUrl)
        .then(response => response.json())
        .then(data => {
            const allItems = data.data;
            allItems.forEach(manga => {
                const { mangaType, canonicalTitle, synopsis, posterImage, ageRating, startDate, popularityRank, ratingRank } = manga.attributes;

                const mangaTypeUpperCase = mangaType.charAt(0).toUpperCase() + mangaType.slice(1);
                let date = startDate ? startDate.slice(0, 4) : "Date not found"

                const contentNotFound = "../../../src/imgs/cntf-1.png";

                const mangaItem = document.createElement("div");
                const divTooltip = document.createElement("div");
                const spanTooltip = document.createElement("span");
                const asideDetails = document.createElement("aside");
                const h3 = document.createElement("h3");
                const relevantInfos = document.createElement("div");
                const p = document.createElement("p");
                const popularityRankP = document.createElement("p");
                const pTypeManga = document.createElement("p");
                const img = document.createElement("img");
                const articleMobile = document.createElement("article");
                const h3Mobile = document.createElement("span");

                mangaItem.classList.add("card-front");
                divTooltip.classList.add("tooltip");
                spanTooltip.classList.add("tooltiptext");
                asideDetails.classList.add("details-tooltip");
                relevantInfos.classList.add("relevant-infos")
                articleMobile.classList.add("article-mobile");
                popularityRankP.classList.add("popularity-rank-p");
                h3Mobile.classList.add("text-overlay");
                img.classList.add("box");

                img.src = posterImage.large || posterImage.medium || posterImage.small || contentNotFound;
                h3.textContent = `${canonicalTitle} - ${date}`;
                popularityRankP.textContent = `🎉 #${popularityRank} Most popular ✨ #${ratingRank} Rated`;
                pTypeManga.textContent = `Type: ${mangaTypeUpperCase}`;
                p.innerHTML = `&nbsp; ${synopsis}`;
                h3Mobile.textContent = `${canonicalTitle} - ${date}`;;

                categoriesDiv.appendChild(mangaItem);
                mangaItem.appendChild(divTooltip);
                divTooltip.appendChild(spanTooltip);
                divTooltip.appendChild(img);
                mangaItem.appendChild(articleMobile);
                articleMobile.appendChild(h3Mobile);
                spanTooltip.appendChild(asideDetails);
                asideDetails.appendChild(h3);
                asideDetails.appendChild(relevantInfos);
                relevantInfos.appendChild(popularityRankP);
                relevantInfos.appendChild(pTypeManga);
                asideDetails.appendChild(p);

                const cardImgs = document.querySelectorAll('.card-front img')
                cardImgs.forEach((cardImg) => {
                    cardImg.onload = () => {
                        document.querySelectorAll('.card-front').forEach((card_front) => {
                            card_front.classList.remove('loadingGrid');
                        });
                    };
                });

                getAnime(mangaItem, manga.id);
            });
            hideLoading();
        })
        .catch(error => {
            console.log(error.message, "Erro em categories");
        });
}

submitFilter.addEventListener("click", filterCategory);
function filterCategory() {
    titleCategory.innerHTML = `${url}`;
    categoriesDiv.innerHTML = "";
    offset = 18;
    showLoading();
    categories();
}

window.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        filterCategory();
    }
});
hideLoading();
filterCategory();

if(!target) {
    const divListItem = document.createElement("div");
    divListItem.setAttribute("id", "listItem");
    body.appendChild(divListItem);
} 

// Ativado quando passar o carai do 1 segundo e aumenta lá na URL
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            offset += 18;
            showLoading();
            categories();
        }
    });
});
observer.observe(target);