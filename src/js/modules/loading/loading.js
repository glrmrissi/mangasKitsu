function showLoading() {
    const div = document.createElement('div');
    div.classList.add('loader');
    
    document.body.appendChild(div);
}

function hideLoading() { 
    const loadings = document.getElementsByClassName("loader");
    if (loadings.length) loadings[0].remove();
}