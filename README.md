# Catálogo de Mangas com Kitsu API

Este é um projeto de catálogo de mangas desenvolvido utilizando HTML, SCSS e JavaScript puro. A aplicação consome a [Kitsu API](https://kitsu.docs.apiary.io/) para exibir uma lista de mangas com paginação dinâmica.

---

## 🔨 Tecnologias Utilizadas

- **HTML5** — Estrutura semântica da página.
- **SCSS (SASS)** — Pré-processador CSS para estilização modular e reaproveitável.
- **JavaScript (Vanilla JS)** — Lógica da aplicação e integração com a API.
- **Kitsu API** — Fonte dos dados de mangas, consumida via requisições HTTP.


---

## 🔄 Funcionalidades

- Exibição de mangas atualizados diretamente da API.
- Paginação com controle de navegação.
- Paginação com controle de navegação (próxima / anterior).
- Pesquisa dinâmica
- Categorias com filtragem
- Layout limpo e responsivo com SCSS.

---

## 🛠️ Como Executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/glrmrissi/mangasKitsu.git
   
2. Entre na pasta
   ```bash
   cd mangasKitsu

3. Na pasta
   ```bash
   code .

---

📂 Estrutura do Projeto
  ```bash
  │   .gitignore
│   index.html
│   LICENSE
│   README.md
│
└───src
    ├───icon
    │       arrow-left.svg
    │       arrow-right.svg
    │       arrow-up-right-circle.svg
    │       arrows-expand-vertical.svg
    │       bar-chart-steps.svg
    │       bar-chart.svg
    │       book-fill.svg
    │       book-half.svg
    │       book.svg
    │       card-image.svg
    │       cloud-moon-fill.svg
    │       cloud-sun-fill.svg
    │       github.svg
    │       house.svg
    │       linkedin.svg
    │       list-ul.svg
    │       logo.png
    │       plus-lg.svg
    │       profile.svg
    │       question-circle.svg
    │       search.svg
    │       searchBlack.svg
    │       stack.svg
    │
    ├───imgs
    │   │   back.jpg
    │   │   cat.png
    │   │   cntf-1.jpg
    │   │   cntf-2.jpg
    │   │   cntf-3.jpg
    │   │   load.gif
    │   │   profilePhoto.png
    │   │
    │   └───slider
    │           chainsawmanLogo.png
    │           chainsawmanSlider.jpg
    │           dandadanSlider.png
    │           dandanLogo.png
    │           hxh.jpg
    │           hxhLogo.png
    │           jujutsuSlider.jpg
    │           logoJujutsu.png
    │
    ├───js
    │   │   callBack.js
    │   │   main.js
    │   │
    │   ├───modules
    │   │   ├───fadeInOut
    │   │   │       fadeInOut.js
    │   │   │
    │   │   ├───goToTop
    │   │   │       goToTop.js
    │   │   │
    │   │   ├───loading
    │   │   │       loading.js
    │   │   │
    │   │   ├───pagination
    │   │   │       pagination.js
    │   │   │
    │   │   ├───search
    │   │   │       loadMore.js
    │   │   │       search.js
    │   │   │
    │   │   ├───swiper
    │   │   │       swiper.js
    │   │   │
    │   │   └───tooltip
    │   │           tooltip.js
    │   │
    │   ├───pages
    │   │   ├───categories
    │   │   │       categories.js
    │   │   │
    │   │   ├───loadMangas
    │   │   │       loadMangas.js
    │   │   │
    │   │   ├───mangas
    │   │   │       manga.js
    │   │   │
    │   │   ├───manhuas
    │   │   │       manhuas.js
    │   │   │
    │   │   ├───manhwas
    │   │   │       manhwas.js
    │   │   │
    │   │   ├───paginationDetails
    │   │   │   │   paginationDetails.js
    │   │   │   │
    │   │   │   ├───chapters
    │   │   │   │       chapters.js
    │   │   │   │
    │   │   │   └───characters
    │   │   │           characters.js
    │   │   │
    │   │   └───trending
    │   │           trending.js
    │   │
    │   └───services
    │       └───api
    │               fetchApi.js
    │               getAnimeId.js
    │               getRecents.js
    │               getTrending.js
    │               loadPage.js
    │
    ├───pages
    │   ├───about
    │   │       about.html
    │   │
    │   ├───categories
    │   │       categories.html
    │   │
    │   ├───details
    │   │   │   details-manga.html
    │   │   │
    │   │   └───js
    │   │           script.js
    │   │
    │   ├───mangas
    │   │       mangas.html
    │   │
    │   ├───manhuas
    │   │       manhuas.html
    │   │
    │   ├───manhwas
    │   │       manhwas.html
    │   │
    │   ├───profile
    │   │       profile.html
    │   │
    │   ├───search
    │   │       search.html
    │   │
    │   └───trending
    │           trending.html
    │
    ├───styles
    │   │   import.css
    │   │   import.css.map
    │   │   import.scss
    │   │
    │   └───scss
    │       ├───layout
    │       │   ├───about
    │       │   │       _about.scss
    │       │   │
    │       │   ├───categoryAside
    │       │   │       _categoryAside.scss
    │       │   │
    │       │   ├───catSection
    │       │   │       _catSection.scss
    │       │   │
    │       │   ├───footer
    │       │   │       _footer.scss
    │       │   │
    │       │   ├───header
    │       │   │       _header.scss
    │       │   │
    │       │   ├───mainContainer
    │       │   │       _main-container.scss
    │       │   │
    │       │   ├───manga
    │       │   │       _manga.scss
    │       │   │
    │       │   ├───mangaDetails
    │       │   │       _manga-details.scss
    │       │   │
    │       │   ├───navigation
    │       │   │       _navigation.scss
    │       │   │
    │       │   ├───profile
    │       │   │       _profile.scss
    │       │   │
    │       │   ├───released
    │       │   │       _released.scss
    │       │   │
    │       │   ├───search
    │       │   │       _search.scss
    │       │   │
    │       │   ├───searchInput
    │       │   │       _search-input.scss
    │       │   │
    │       │   ├───sideBar
    │       │   │       _side-bar.scss
    │       │   │
    │       │   └───slider
    │       │           _slider.scss
    │       │
    │       ├───queries
    │       │   ├───mobile
    │       │   │       _mobile.scss
    │       │   │
    │       │   ├───notebook
    │       │   │       _notebook.scss
    │       │   │
    │       │   ├───tablet
    │       │   │       _tablet.scss
    │       │   │
    │       │   └───tv
    │       │           _tv.scss
    │       │
    │       ├───themes
    │       │       _dark.scss
    │       │       _white.scss
    │       │
    │       └───utils
    │               _utils.scss
    │               _variables.scss
    │
    └───templates
        ├───footer
        │       footer.js
        │
        └───header
                header.js
