// https://kitsu.io/api/edge/chapters

const mainDiv = document.querySelector("#chapters")

mainDiv.classList.add("grid-launcher")

let mangaId = new URL(location);
let offset = 10;
mangaId = mangaId.searchParams.get("id");

function load() {

    fetch(`https://kitsu.io/api/edge/manga/${mangaId}/chapters?page[offset]=${offset}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            data.data.forEach(chapters => {
                const title = chapters.attributes.canonicalTitle;
                const thumbnail = chapters.attributes.thumbnail;

                const contentNotFound = "../../../src/imgs/cntf-1.png";

                const titlespan = document.createElement("span");
                const img = document.createElement("img");
                const containerImgTitle = document.createElement("div");

                containerImgTitle.classList.add("div-grid-characters");

                img.classList.add("img-characters");

                titlespan.textContent = title;
                img.src = thumbnail || contentNotFound;

                console.log(title)
                console.log(thumbnail)

                if (title != null) {
                    containerImgTitle.appendChild(titlespan)
                    containerImgTitle.appendChild(img)
                    mainDiv.appendChild(containerImgTitle)
                }
            });
        })
        .catch(e => {
            console.error(e)
        })
}
load()
function x() {
    offset += 10;
    load()
}
x()
