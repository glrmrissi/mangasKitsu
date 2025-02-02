const divCharacters = document.getElementById("characters");

async function x() {
    const mangaId = localStorage.getItem('selectedAnimeId');
    await fetch(`https://kitsu.io/api/edge/manga/${mangaId}`)
        .then(response => response.json())
        .then(data => {
            data.data.forEach(character=> {
                const img = document.createElement("img");
                const imageUrl = character.attributes.posterImage.large
                img.src = imageUrl;
                img.alt = character.attributes && character.attributes.name ? character.attributes.name : 'Nome do Personagem';
            
                divCharacters.appendChild(img);
            
            });
        })
        .catch(error => console.error("Erro ao buscar os personagens:", error));
}

x()
