// https://kitsu.io/api/edge/chapters
fetch("https://kitsu.io/api/edge/chapters/38")
.then(response => response.json())
.then(data => {
    console.log(data)
})