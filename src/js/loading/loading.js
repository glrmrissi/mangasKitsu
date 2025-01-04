// Loading entre as requisições da API, tenho que dar algumas arrumadas

function showLoading() {
    const div = document.createElement('div');
    div.classList.add('loading');
    const label = document.createElement("label");
    const img = document.createElement("img");
    img.src = "../src/imgs/load.gif";
    img.alt = "Loading...";
    document.body.appendChild(div);
    label.appendChild(img);
    div.appendChild(label);
}

function hideLoading() {
    const loadings = document.getElementsByClassName("loading");
      if(loadings.length) {
        loadings[0].remove();
    }
}