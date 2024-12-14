fetch('src/templates/footer/footer.html')
    .then(response => response.text())
    .then(data => {
            console.log("Arquivo carregado com sucesso")
            document.getElementById('footer').innerHTML = data; 
    });