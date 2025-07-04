import loadSectionMangas  from "../../pages/loadMangas/loadMangas.js"

export const fetchMangasPage = async () => {
  fetch("https://raw.githubusercontent.com/glrmrissi/mangasKitsuJson/refs/heads/main/links.json")
    .then(response => response.json())
    .then(data => {
      data.linksMangas.forEach((link) => {
        const url = link;
        loadSectionMangas(url);
      })
    });
};


fetchMangasPage();