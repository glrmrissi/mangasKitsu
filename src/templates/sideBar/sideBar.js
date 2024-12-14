fetch('src/templates/sideBar/sideBar.html')
    .then(response => response.text())
    .then(data => {
            document.getElementById("side_bar").innerHTML = data; 
            console.log("Arquivo carregado com sucesso")
    }) .catch (er => {
        console.log(message.er)
    }) 
