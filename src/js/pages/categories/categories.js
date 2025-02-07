const categorySelector = document.querySelector("#categoriesSelect")
const defaultCategory = categorySelector.options[categorySelector.selectedIndex]
let url = defaultCategory.value;
let offset = 18;
let limit = 18;
const categoriesDiv = document.getElementById("categoriesMain");
const target = document.querySelector("#listItem");

const categorySelected = document.querySelectorAll(".categoriesNames");
const titleCategory = document.getElementById("titleCategory")
const submitFilter = document.querySelector("#submitFilter")

titleCategory.innerHTML = `Categories  <span class="highlight-title"> - ${url}</span>`
setTimeout(() => {
    target.style.display = "flex"; 
}, 1000);

categorySelected.forEach(btns => {
    btns.addEventListener("click", () => {
        url = btns.value
    })
})


const categories = async () => {
    let KitsuUrl = `https://kitsu.io/api/edge/manga?filter[categories]=${encodeURIComponent(url)}&page[limit]=${limit}&page[offset]=${offset}`
    fetch(KitsuUrl)
        .then(response => response.json())
        .then(data => {
            const allItems = data.data;

            allItems.forEach(categories => {
                const { mangaType, canonicalTitle, synopsis, posterImage, ageRating, startDate, popularityRank, ratingRank } = categories.attributes;

                const mangaTypeUpperCase = mangaType.charAt(0).toUpperCase() + mangaType.slice(1);
                let date = startDate ? startDate.slice(0,4) : "Date not found"

                let contentNotFound = [
                    "../../../src/imgs/cntf-1.jpg",
                    "../../../src/imgs/cntf-2.jpg",
                    "../../../src/imgs/cntf-3.jpg"
                ];

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
                img.classList.add("box");

                img.src = posterImage.large || posterImage.medium || posterImage.small || contentNotFound[Math.floor(Math.random() * contentNotFound.length)];
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

function filterCategory() {
    titleCategory.innerHTML = `Categories  <span class="highlight-title"> - ${url}</span>`
    categoriesDiv.innerHTML = "";
    offset = 0;
    categories();
}

submitFilter.addEventListener("click", filterCategory);
window.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        filterCategory()
    }
});


// Ativado quando passar o carai do 1 segundo e aumenta lá na URL
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            offset += 18;
            console.log(offset)
            categories();
        }
    });
});
observer.observe(target);