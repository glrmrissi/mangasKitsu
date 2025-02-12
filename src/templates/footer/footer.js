const pathsFooter = [
        "src/templates/footer/footer.html",
        "../../../src/templates/footer/footer.html"
];

async function loadFooter() {
        for (let path of pathsFooter) {
                try {
                        const response = await fetch(path);
                        if (response.ok) {
                                const html = await response.text();
                                document.getElementById("footer").innerHTML = html;
                                break;
                        }
                } catch (error) {
                        console.error(`Erro ao carregar: ${path}`);
                }
        }
}

loadFooter();