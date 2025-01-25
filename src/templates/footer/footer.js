fetch('./src/templates/footer/footer.html')
    .then(response => response.text())
    .then(data => {
            console.log("Arquivo carregado com sucesso: footer.js")
            document.getElementById('footer').innerHTML = data; 
    });