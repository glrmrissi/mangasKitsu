let url = null;

const categories = async () => {
    console.log(url)

    const categorySelected = document.querySelectorAll(".categoriesNames")

    categorySelected.forEach(btns => {
        btns.addEventListener("click", () => {
            url = btns.getAttribute("value")
            console.log(btns.getAttribute("value"));
            fetch(`https://kitsu.io/api/edge/anime?filter[categories]=${url}`)
                .then(response => response.json())
                .then(data => {
                    const categoriesDiv = document.getElementById("categoriesMain")

                    categoriesDiv.innerHTML = "";

                    data.data.forEach(categories => {
                        const p = document.createElement("p");
                        const img = document.createElement("img");
                        img.src = categories.attributes.posterImage.small
                        p.textContent = `${categories.attributes.canonicalTitle}`
                        categoriesDiv.appendChild(p)
                        categoriesDiv.appendChild(img)
                    });
                })
                .catch(error => {
                    console.log("Erro em categories")
                })
        })
    })
}

categories();
