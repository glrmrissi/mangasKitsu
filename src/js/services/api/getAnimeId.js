
export function getAnime(mangaItem, mangaId) {
    mangaItem.addEventListener("click", () => {
        const baseURL = location.hostname === "127.0.0.1" || location.hostname === "localhost" ? "/" : "/mangasKitsu/";
        const detailsUrl = `${baseURL}src/pages/details/details-manga.html?id=${encodeURIComponent(mangaId)}`

        window.open(detailsUrl, '_blank');
        return mangaId
    });
}