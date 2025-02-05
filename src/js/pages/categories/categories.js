let url = null;
let offset = 0;
let limit = 18;
const categoriesDiv = document.getElementById("categoriesMain");
const target = document.querySelector("#listItem");
const categorySelected = document.querySelectorAll(".categoriesNames");
const titleCategory = document.getElementById("titleCategory")
const submitFilter = document.querySelector("#submitFilter")

function loadCategorySelected() {
    setTimeout(function () {
        target.style.display = "flex"
    }, 1000);
    categorySelected.forEach(btns => {
        btns.addEventListener("click", () => {
            let url = btns.getAttribute("value")
            
            submitFilter.addEventListener("click", () => {
                titleCategory.innerHTML = `Categories  <span class="highlight-title"> - ${url}</span>`
                categoriesDiv.innerHTML = "";
                offset = 18
                categories();
                console.log("submit", url)
            })
        })
    })
}

loadCategorySelected()

const categories = async () => {
    let KitsuUrl = `https://kitsu.io/api/edge/manga?filter[categories]=${encodeURIComponent(url)}&page[limit]=${limit}&page[offset]=${offset}`
    fetch(KitsuUrl)
        .then(response => response.json())
        .then(data => {
            const allItems = data.data;

            allItems.forEach(categories => {
                const { mangaType, canonicalTitle, synopsis, posterImage, ageRating, startDate, popularityRank, ratingRank } = categories.attributes;

                const mangaTypeUpperCase = mangaType.charAt(0).toUpperCase() + mangaType.slice(1);
                const date = startDate.slice(0, 4);

                const div = document.createElement("div");
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

                div.classList.add("card-front");
                divTooltip.classList.add("tooltip");
                spanTooltip.classList.add("tooltiptext");
                asideDetails.classList.add("details-tooltip");
                relevantInfos.classList.add("relevant-infos")
                articleMobile.classList.add("article-mobile");
                popularityRankP.classList.add("popularity-rank-p");

                img.src = posterImage.small;
                h3.textContent = `${canonicalTitle} - ${date}`;
                popularityRankP.textContent = `🎉 #${popularityRank} Most popular ✨ #${ratingRank} Rated`
                pTypeManga.textContent = `Type: ${mangaTypeUpperCase}`;
                p.innerHTML = `&nbsp; ${synopsis}`;
                h3Mobile.textContent = `${canonicalTitle} - ${date}`;

                categoriesDiv.appendChild(div);
                div.appendChild(divTooltip);
                divTooltip.appendChild(spanTooltip);
                divTooltip.appendChild(img);
                div.appendChild(articleMobile);
                articleMobile.appendChild(h3Mobile)
                spanTooltip.appendChild(asideDetails);
                asideDetails.appendChild(h3);
                asideDetails.appendChild(relevantInfos)
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

                div.addEventListener('click', () => {
                    console.log(categories.id)
                    localStorage.setItem('selectedAnimeId', categories.id);

                    window.open('../../../src/pages/details/details-manga.html', '_blank')
                });
            });
        })
        .catch(error => {
            console.log(error.message, "Erro em categories")
        })
}

categories();

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            offset += 18;
            categories();
        }
    });
});
observer.observe(target);