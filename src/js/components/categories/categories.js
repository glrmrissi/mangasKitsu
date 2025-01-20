let url = null;
let offset = 0;
let limit = 10;
const categoriesDiv = document.getElementById("categoriesMain");
const target = document.querySelector("#listItem");
const categorySelected = document.querySelectorAll(".categoriesNames");
categorySelected.forEach(btns => {
    btns.addEventListener("click", () => {
        url = btns.getAttribute("value")
        setTimeout(function() {
            target.style.display = "flex"
        }, 1000);
        categoriesDiv.innerHTML = "";
        offset = 10
        categories();
    })
})

const categories = async () => {
    let KitsuUrl = `https://kitsu.io/api/edge/manga?filter[categories]=${encodeURIComponent(url)}&page[limit]=${limit}&page[offset]=${offset}`
    console.log(KitsuUrl)
    fetch(KitsuUrl)
        .then(response => response.json())
        .then(data => {
            data.data.forEach(categories => {
                const div = document.createElement("div")
                const p = document.createElement("p");
                const img = document.createElement("img");
                img.src = categories.attributes.posterImage.small
                p.textContent = `${categories.attributes.canonicalTitle}`
                categoriesDiv.appendChild(div)
                div.appendChild(img)
                div.appendChild(p)
            });
        })
        .catch(error => {
            console.log("Erro em categories")
        })
}


    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                offset += 10;
                console.log(offset)
                categories();
            }
        });
    });
    observer.observe(target);