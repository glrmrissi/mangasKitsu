document.getElementById('mangasName').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        const mangaName = document.getElementById('mangasName').value;
        const searchUrl = `src/pages/search/search.html?name=${encodeURIComponent(mangaName)}` && `../../../src/pages/search/search.html?name=${encodeURIComponent(mangaName)}`
        window.open(searchUrl, '_blank');
    }
});