let url = null;
let offset = 0;
let limit = 18;
const categoriesDiv = document.getElementById("categoriesMain");
const target = document.querySelector("#listItem");
const categorySelected = document.querySelectorAll(".categoriesNames");
const titleCategory = document.getElementById("titleCategory")
categorySelected.forEach(btns => {
    btns.addEventListener("click", () => {
        url = btns.getAttribute("value")
        titleCategory.innerHTML = `Categories <span class="highlight-title">- ${url}</span>`
        setTimeout(function () {
            target.style.display = "flex"
        }, 1000);
        categoriesDiv.innerHTML = "";
        offset = 18
        categories();
    })
})

const categories = async () => {
    let KitsuUrl = `https://kitsu.io/api/edge/manga?filter[categories]=${encodeURIComponent(url)}&page[limit]=${limit}&page[offset]=${offset}`
    fetch(KitsuUrl)
        .then(response => response.json())
        .then(data => {
            data.data.forEach(categories => {
                const div = document.createElement("div");
                const divTooltip = document.createElement("div");
                const spanTooltip = document.createElement("span");
                const asideDetails = document.createElement("aside")
                const h3 = document.createElement("h3")
                const p = document.createElement("p");
                const img = document.createElement("img");

                div.classList.add("card-front");
                divTooltip.classList.add("tooltip");
                spanTooltip.classList.add("tooltiptext");
                asideDetails.classList.add("details-tooltip");

                img.src = categories.attributes.posterImage.small;
                h3.textContent = `${categories.attributes.canonicalTitle} - ${categories.attributes.startDate}`;
                p.innerHTML = `&nbsp; ${categories.attributes.synopsis}`;
                categoriesDiv.appendChild(div);
                div.appendChild(divTooltip);
                divTooltip.appendChild(spanTooltip);
                divTooltip.appendChild(img);
                spanTooltip.appendChild(asideDetails);
                asideDetails.appendChild(h3);
                asideDetails.appendChild(p);

                const cardImgs = document.querySelectorAll('.tooltip img')
                cardImgs.forEach((cardImg) => {
                    cardImg.onload = () => {
                        document.querySelectorAll('.tooltip').forEach((tooltip) => {
                            tooltip.classList.remove('loadingGrid');
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
            console.log(offset)
            categories();
        }
    });
});
observer.observe(target);