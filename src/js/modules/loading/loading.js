window.AppConfig = {
    loadingImage: "../../../src/imgs/load.gif"
};

function showLoading(customImagePath) {
    const div = document.createElement('div');
    div.classList.add('loading');
    const label = document.createElement("label");
    const img = document.createElement("img");
    
    // Local host
    // img.src = customImagePath || window.AppConfig.loadingImage;
    
    img.src = "src/imgs/load.gif" && "../../../src/imgs/load.gif" 
    img.alt = "Loading...";
    document.body.appendChild(div);
    label.appendChild(img);
    div.appendChild(label);
}

function hideLoading() { 
    const loadings = document.getElementsByClassName("loading");
    if (loadings.length) loadings[0].remove();
}