
export function getAnime(mangaItem, mangaId) {
    mangaItem.addEventListener("click", () => {
        const detailsUrl = `../../src/pages/details/details-manga.html?id=${encodeURIComponent(mangaId)}`

        window.open(detailsUrl, '_blank');
        return mangaId
    });
}