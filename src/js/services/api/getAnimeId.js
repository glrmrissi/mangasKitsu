
export function getAnime(mangaItem, mangaId) {
    mangaItem.addEventListener("click", () => {
        const pathParts = location.pathname.split("/").filter(Boolean);
        const firstFolder = pathParts.length > 0 ? pathParts : "";

        const baseURL = firstFolder[0] === "src" || firstFolder[1] === "src"
            ? `../../../`
            : "";
        const detailsUrl = `${baseURL}src/pages/details/details-manga.html?id=${encodeURIComponent(mangaId)}`

        window.open(detailsUrl, '_blank');
        return mangaId
    });
}