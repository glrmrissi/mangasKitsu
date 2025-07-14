const divCharacters = document.getElementById("characters");
const charactersGrid = document.createElement("div");
const loadMore = document.createElement("button");

charactersGrid.classList.add("grid-launcher");

let mangaId = new URL(location);
mangaId = mangaId.searchParams.get("id");

let offset = 0;

async function loadCharacters() {
    showLoading();
    let url = `https://kitsu.io/api/edge/manga/${mangaId}/characters?include=character&page[offset]=${offset}`
    await fetch(url)
        .then(response => response.json())
        .then(data => {
            const datas = data.included;

            datas.forEach((characters) => {
                const imgsUrl = characters?.attributes?.image?.original;
                const divImgCharacters = document.createElement("article");
                const image = document.createElement("img");
                const titleCharacter = document.createElement("p");

                image.classList.add("img-characters");
                divImgCharacters.classList.add("div-grid-characters");
                titleCharacter.classList.add("text-overlay");
                
                const contentNotFound = "../../../src/imgs/cntf-1.png";

                image.src = imgsUrl || contentNotFound;

                titleCharacter.textContent = characters.attributes?.names?.en || characters.attributes?.names?.ja_jp;
                if (imgsUrl != null || imgsUrl != undefined) {
                    divCharacters.textContent = "";
                    divImgCharacters.appendChild(image);
                    divImgCharacters.appendChild(titleCharacter);
                    charactersGrid.appendChild(divImgCharacters);
                    divCharacters.appendChild(charactersGrid);
                }
            });

            let ultimo = datas[datas.length - 1]
            if (ultimo === datas[datas.length - 1]) {
                loadMore.textContent = "Load more characters";
                divCharacters.appendChild(loadMore);
                console.log("created")
            } else {
                console.info("Last child not found");
            }
            hideLoading();
        })
        .catch(error => {
            allContentLoad();
        });
}

function allContentLoad() {
    const h2Error = document.createElement("h2");

    h2Error.id = "h2_error";

    const imageError = document.createElement("img");
    imageError.src = "../../../src/imgs/confuseCat.png";
    imageError.style.width = "500px";
    imageError.title = "Not found characters";
    imageError.alt = "Not found characters";
    imageError.classList.add("img-characters");
    h2Error.textContent = "Not found characters";

    if (divCharacters.contains(document.getElementById("h2_error"))) {
        console.log("Not found characters!")
    } else {
        divCharacters.appendChild(h2Error);
        divCharacters.appendChild(imageError);
        hideLoading();
    }
    hideLoading();
}


loadMore.onclick = function () {
    offset += 10;
    loadCharacters();
}

loadCharacters();