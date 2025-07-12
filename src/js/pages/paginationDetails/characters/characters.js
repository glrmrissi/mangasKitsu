const divCharacters = document.getElementById("characters");
const charactersGrid = document.createElement("div");
charactersGrid.classList.add("grid_characters");

const loadMore = document.createElement("button")
let mangaId = new URL(location);
let offset = 0;
mangaId = mangaId.searchParams.get("id");

async function x() {
    showLoading();
    let url = `https://kitsu.io/api/edge/manga/${mangaId}/characters?include=character&page[offset]=${offset}`;
    console.log(url)
    await fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data.included)
            const datas = data.included

            // TODO: ARRUMAR ISSO AQUI, QUE ESTÁ RETORNANDO UM MONTE DE VEZES A FOTO DO GATO 
            const h1Error = document.createElement("h1");
            h1Error.textContent = "Not Found Characters";

            const imageError = document.createElement("img");
            imageError.src = "../../../src/imgs/confuseCat.png";
            imageError.style.width = "500px";
            imageError.title = "Not found characters";
            imageError.alt = "Not found characters";
            imageError.classList.add("img-characters");

            if (datas === undefined) {
                if (divCharacters.contains(h1Error)) {
                    divCharacters.removeChild(h1Error);
                    divCharacters.removeChild(imageError);
                } else {
                    divCharacters.appendChild(h1Error);
                    divCharacters.appendChild(imageError);
                }
                hideLoading();
            }
            
            datas.forEach((characters) => {
                const imgsUrl = characters?.attributes?.image?.original;
                const divImgCharacters = document.createElement("article");
                const image = document.createElement("img");
                const titleCharacter = document.createElement("p")
                
                image.classList.add("img-characters");
                divImgCharacters.classList.add("div-grid-characters");
                titleCharacter.classList.add("text-overlay")
                
                image.src = imgsUrl;
                
                titleCharacter.textContent = characters.attributes?.names?.en || characters.attributes?.names?.ja_jp;
                if (imgsUrl != null || imgsUrl != undefined) {
                    divCharacters.textContent = ""
                    divImgCharacters.appendChild(image);
                    divImgCharacters.appendChild(titleCharacter)
                    charactersGrid.appendChild(divImgCharacters)
                    divCharacters.appendChild(charactersGrid);
                }
            });
            let ultimo = datas[datas.length - 1]
            if (ultimo === datas[datas.length - 1]) {
                loadMore.textContent = "Load more characters"
                divCharacters.appendChild(loadMore)
            } else {
                console.info("Last child not found")
            }
            console.log(ultimo)
            hideLoading();
        })
        .catch(error => console.error("Erro ao buscar os personagens:", error));
    }

loadMore.onclick = function () {
    offset += 10;
    x();
}

x();