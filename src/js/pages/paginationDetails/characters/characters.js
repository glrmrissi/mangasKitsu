const divCharacters = document.getElementById("characters");
const charactersGrid = document.createElement("div");
charactersGrid.classList.add("grid_characters");

let mangaId = new URL(location);

mangaId = mangaId.searchParams.get("id")

async function x() {
    await fetch(`https://kitsu.io/api/edge/manga/${mangaId}/characters?include=character&page[limit]=20`)
        .then(response => response.json())
        .then(data => {
            console.log(data.included)
            const datas = data.included
            if(datas === undefined) {
                const image = document.createElement("img");
                image.src = "../../../src/imgs/confuseCat.png";
                image.style.width = "500px"
                image.title = "Not found characters";
                image.alt = "Not found characters";
                image.classList.add("img-characters");
                const h1 = document.createElement("h1");
                h1.textContent = "Not Found Characters"
                divCharacters.appendChild(image);
                divCharacters.appendChild(h1);
            }
            datas.forEach((characters) => {
                const imgsUrl = characters?.attributes?.image?.original;
                const divImgCharacters = document.createElement("article");
                const image = document.createElement("img");
                image.classList.add("img-characters");
                divImgCharacters.classList.add("div-grid-characters");
                image.src = imgsUrl;
                
                if(imgsUrl != null || imgsUrl != undefined) {
                    divCharacters.textContent = ""
                    divImgCharacters.appendChild(image);
                    charactersGrid.appendChild(divImgCharacters)
                    divCharacters.appendChild(charactersGrid);
                }
                

            });
        })
        .catch(error => console.error("Erro ao buscar os personagens:", error));
}

x()
