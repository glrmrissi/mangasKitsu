const divCharacters = document.getElementById("characters");
const charactersGrid = document.createElement("div");
charactersGrid.classList.add("grid_characters");

let mangaId = new URL(location);

mangaId = mangaId.searchParams.get("id")

async function x() {
    showLoading();
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
                if(imgsUrl != null || imgsUrl != undefined) {
                    divCharacters.textContent = ""
                    divImgCharacters.appendChild(image);
                    divImgCharacters.appendChild(titleCharacter)
                    charactersGrid.appendChild(divImgCharacters)
                    divCharacters.appendChild(charactersGrid);
                }
            });
            hideLoading();
        })
        .catch(error => console.error("Erro ao buscar os personagens:", error));
    }
x()
