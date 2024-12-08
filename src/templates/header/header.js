fetch('../src/templates/header/header.html')
    .then(response => response.text())
    .then(data => {
            console.log("Arquivo carregado com sucesso")
            document.getElementById('header').innerHTML = data; 
    });