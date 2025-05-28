# Catálogo de Mangas com Kitsu API

Este é um projeto de catálogo de mangas desenvolvido utilizando HTML, SCSS e JavaScript puro. A aplicação consome a [Kitsu API](https://kitsu.docs.apiary.io/) para exibir uma lista de mangas com paginação dinâmica.

---

## 🔨 Tecnologias Utilizadas

- **HTML5** — Estrutura semântica da página.
- **SCSS (SASS)** — Pré-processador CSS para estilização modular e reaproveitável.
- **JavaScript (Vanilla JS)** — Lógica da aplicação e integração com a API.
- **Kitsu API** — Fonte dos dados de animes/mangas, consumida via requisições HTTP.

---

## 🔄 Funcionalidades

- Exibição de mangas atualizados diretamente da API.
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

---

📂 Estrutura do Projeto
  ```bash
  |   .gitignore
|   index.html
|   LICENSE
|   README.md
|
\---src
    +---icon
    |       arrow-left.svg
    |       arrow-right.svg
    |       arrow-up-right-circle.svg
    |       arrows-expand-vertical.svg
    |       bar-chart-steps.svg
    |       bar-chart.svg
    |       book-fill.svg
    |       book-half.svg
    |       book.svg
    |       card-image.svg
    |       cloud-moon-fill.svg
    |       cloud-sun-fill.svg
    |       github.svg
    |       house.svg
    |       linkedin.svg
    |       list-ul.svg
    |       logo.png
    |       plus-lg.svg
    |       profile.svg
    |       question-circle.svg
    |       search.svg
    |       stack.svg
    |
    +---imgs
    |       back.jpg
    |       cntf-1.jpg
    |       cntf-2.jpg
    |       cntf-3.jpg
    |       load.gif
    |
    +---js
    |   |   callBack.js
    |   |   main.js
    |   |
    |   +---components
    |   |       components.js
    |   |       styles.js
    |   |
    |   +---modules
    |   |   +---fadeInOut
    |   |   |       fadeInOut.js
    |   |   |
    |   |   +---goToTop
    |   |   |       goToTop.js
    |   |   |
    |   |   +---loading
    |   |   |       loading.js
    |   |   |
    |   |   +---loadProfilePhoto
    |   |   |       loadProfilePhoto.js
    |   |   |
    |   |   +---pagination
    |   |   |       pagination.js
    |   |   |
    |   |   +---search
    |   |   |       btnSearch.js
    |   |   |       loadMore.js
    |   |   |       search.js
    |   |   |
    |   |   \---tooltip
    |   |           tooltip.js
    |   |
    |   +---pages
    |   |   +---categories
    |   |   |       categories.js
    |   |   |
    |   |   +---paginationDetails
    |   |   |   |   paginationDetails.js
    |   |   |   |
    |   |   |   +---chapters
    |   |   |   |       chapters.js
    |   |   |   |
    |   |   |   \---characters
    |   |   |           characters.js
    |   |   |
    |   |   \---trending
    |   |           trending.js
    |   |
    |   \---services
    |       +---api
    |       |       consumeApi.js
    |       |
    |       \---theme
    |               theme.js
    |
    +---pages
    |   +---about
    |   |       about.html
    |   |
    |   +---categories
    |   |       categories.html
    |   |
    |   +---details
    |   |   |   details-manga.html
    |   |   |
    |   |   \---js
    |   |           script.js
    |   |
    |   +---mangas
    |   |       mangas.html
    |   |
    |   +---profile
    |   |   |   profile.html
    |   |   |
    |   |   \---process
    |   |           process.js
    |   |
    |   +---search
    |   |       search.html
    |   |
    |   \---trending
    |           trending.html
    |
    +---styles
    |   |   import.css
    |   |   import.css.map
    |   |   import.scss
    |   |
    |   \---scss
    |       +---layout
    |       |   +---about
    |       |   |       _about.scss
    |       |   |
    |       |   +---categoryAside
    |       |   |       _categoryAside.scss
    |       |   |
    |       |   +---footer
    |       |   |       _footer.scss
    |       |   |
    |       |   +---header
    |       |   |       _header.scss
    |       |   |
    |       |   +---mainContainer
    |       |   |       _main-container.scss
    |       |   |
    |       |   +---mangaDetails
    |       |   |       _manga-details.scss
    |       |   |
    |       |   +---profile
    |       |   |       _profile.scss
    |       |   |
    |       |   +---released
    |       |   |       _released.scss
    |       |   |
    |       |   +---search
    |       |   |       _search.scss
    |       |   |
    |       |   +---searchInput
    |       |   |       _search-input.scss
    |       |   |
    |       |   +---sideBar
    |       |   |       _side-bar.scss
    |       |   |
    |       |   \---slider
    |       |           _slider.scss
    |       |
    |       +---queries
    |       |   +---mobile
    |       |   |       _mobile.scss
    |       |   |
    |       |   +---notebook
    |       |   |       _notebook.scss
    |       |   |
    |       |   +---tablet
    |       |   |       _tablet.scss
    |       |   |
    |       |   \---tv
    |       |           _tv.scss
    |       |
    |       +---themes
    |       |       _dark.scss
    |       |       _white.scss
    |       |
    |       \---utils
    |               _utils.scss
    |               _variables.scss
    |
    \---templates
        \---footer
                footer.html
                footer.js 
