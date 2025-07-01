const divCharacters = document.getElementById("characters");

let mangaId = new URL(location);

mangaId = mangaId.searchParams.get("id")

async function x() {
    await fetch(`https://kitsu.io/api/edge/manga/${mangaId}/characters?include=character&page[limit]=20`)
        .then(response => response.json())
        .then(data => {
            console.log(data.included)
            const datas = data.included
            datas.forEach((characters) => {
                const image = document.createElement("img");
                image.src = characters?.attributes?.image?.original;

                if(image != null) {
                    divCharacters.appendChild(image)
                }

            });
        })
        .catch(error => console.error("Erro ao buscar os personagens:", error));
}

x()
